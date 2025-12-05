import { NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend only if API key is available (lazy initialization)
const getResendClient = () => {
	if (!process.env.RESEND_API_KEY) {
		return null
	}
	return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { name, email, company, interest, message, lang } = body

		console.log("📧 Contact form submission:", { name, email, interest })
		console.log("🔑 API Key present:", !!process.env.RESEND_API_KEY)
		console.log("📬 Sending notification to:", process.env.CONTACT_EMAIL)

		// Validate required fields
		if (!name || !email) {
			return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
		}

		// Validate API key
		if (!process.env.RESEND_API_KEY) {
			console.error("❌ RESEND_API_KEY not configured")
			return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
		}

		try {
			const resend = getResendClient()
			if (!resend) {
				console.error("❌ Resend client not initialized")
				return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
			}

			// Send ONLY notification email to YOU (not to the customer)
			// This way it works with Resend free tier
			const notificationResult = await resend.emails.send({
				from: "onboarding@resend.dev", // Resend's default sender
				to: process.env.CONTACT_EMAIL || "sberlerch@gmail.com", // YOUR email (verified in Resend)
				reply_to: email, // Customer's email - you can reply directly
				subject: `🌱 New Contact: ${name} (${interest})`,
				html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00D084;">New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Company:</strong> ${company || "N/A"}</p>
              <p><strong>Interest:</strong> ${interest}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message || "N/A"}</p>
              <p><strong>Language:</strong> ${lang === "it" ? "🇮🇹 Italian" : "🇬🇧 English"}</p>
            </div>
            <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>💡 Tip:</strong> Click "Reply" to respond directly to ${email}</p>
            </div>
            <p style="color: #666; font-size: 12px;">
              Sent from contextia.dev contact form<br>
              Time: ${new Date().toLocaleString("it-IT", { timeZone: "Europe/Berlin" })}
            </p>
          </div>
        `,
			})

			console.log("✅ Notification email sent successfully:", notificationResult)

			// NOTE: We do NOT send auto-reply to customer because:
			// 1. Resend free tier only allows sending to verified emails
			// 2. Customer email is not verified
			// 3. You can reply manually from your email

			return NextResponse.json({
				success: true,
				message: "Contact request received successfully",
			})
		} catch (emailError: any) {
			console.error("❌ Email sending error:", emailError)
			console.error("Error details:", {
				message: emailError.message,
				name: emailError.name,
				statusCode: emailError.statusCode,
			})

			// Return more specific error
			return NextResponse.json(
				{
					error: "Failed to send notification",
					details: emailError.message,
					hint: "Check your RESEND_API_KEY and CONTACT_EMAIL",
				},
				{ status: 500 },
			)
		}
	} catch (error: any) {
		console.error("❌ Contact form error:", error)
		return NextResponse.json(
			{
				error: "Server error",
				details: error.message,
			},
			{ status: 500 },
		)
	}
}
