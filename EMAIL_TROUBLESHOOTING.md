# 📧 Email Troubleshooting Guide

## Problem: Emails Not Sending

### Step 1: Check Console Logs

When you submit the form, check the browser console (F12) and terminal for logs:

**Look for:**

```
📧 Contact form submission: { name: '...', email: '...', interest: '...' }
🔑 API Key present: true
📬 Contact email: hello@contextia.dev
✅ Notification email sent: { id: '...' }
✅ Auto-reply sent: { id: '...' }
```

**If you see:**

```
❌ RESEND_API_KEY not configured
```

→ Your `.env.local` file is not loaded correctly

**If you see:**

```
❌ Email sending error: ...
```

→ There's an issue with Resend API

### Step 2: Verify Environment Variables

1. **Check `.env.local` exists:**

    ```bash
    ls -la contextia-landing/.env.local
    ```

2. **Check content:**

    ```bash
    cat contextia-landing/.env.local
    ```

    Should show:

    ```
    RESEND_API_KEY=re_xxxxxxxxxxxxx
    CONTACT_EMAIL=hello@contextia.dev
    ...
    ```

3. **Restart dev server:**
    ```bash
    # Stop server (Ctrl+C)
    npm run dev
    ```

### Step 3: Verify Resend API Key

1. Go to https://resend.com/api-keys
2. Check your API key is active
3. Copy the key again
4. Update `.env.local`
5. Restart server

### Step 4: Test API Key Directly

Create a test file `test-resend.js`:

```javascript
const { Resend } = require("resend")

const resend = new Resend("re_your_key_here") // Replace with your key

async function test() {
	try {
		const result = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: "your-email@example.com", // Replace with your email
			subject: "Test Email",
			html: "<p>This is a test</p>",
		})
		console.log("✅ Success:", result)
	} catch (error) {
		console.error("❌ Error:", error)
	}
}

test()
```

Run:

```bash
node test-resend.js
```

### Step 5: Common Issues & Solutions

#### Issue 1: "API key not found"

**Solution:**

- Make sure API key starts with `re_`
- No spaces before/after the key
- No quotes around the key in `.env.local`

#### Issue 2: "Invalid from address"

**Solution:**

- Use `onboarding@resend.dev` (Resend's default)
- OR verify your domain first in Resend dashboard

#### Issue 3: "Rate limit exceeded"

**Solution:**

- Free tier: 100 emails/day, 3,000/month
- Wait or upgrade plan

#### Issue 4: Environment variables not loading

**Solution:**

```bash
# Make sure file is named exactly .env.local (not .env)
mv .env .env.local

# Restart dev server
npm run dev
```

### Step 6: Alternative - Use Formspree (No API Key Needed)

If Resend continues to have issues, use Formspree:

1. Go to https://formspree.io
2. Create free account
3. Get your form endpoint
4. Update `ContactForm.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault()
	setStatus("loading")

	try {
		const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		})

		if (response.ok) {
			setStatus("success")
			setFormData({ name: "", email: "", company: "", interest: "beta", message: "" })
		} else {
			setStatus("error")
		}
	} catch (error) {
		setStatus("error")
	}
}
```

### Step 7: Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit form
4. Look for `/api/contact` request
5. Check:
    - Status code (should be 200)
    - Response body
    - Request payload

### Step 8: Verify Resend Account

1. Go to https://resend.com/emails
2. Check if emails appear in "Logs"
3. If they appear but not delivered:
    - Check spam folder
    - Verify email address is correct
    - Check Resend delivery status

## Quick Fix Checklist

- [ ] `.env.local` file exists in `contextia-landing/` folder
- [ ] `RESEND_API_KEY` starts with `re_`
- [ ] `CONTACT_EMAIL` is set correctly
- [ ] Dev server restarted after changing `.env.local`
- [ ] Resend API key is active (check dashboard)
- [ ] Using `onboarding@resend.dev` as sender
- [ ] Checked browser console for errors
- [ ] Checked terminal for logs
- [ ] Tested with different email address

## Still Not Working?

### Option 1: Simplify to Console Log Only

Temporarily disable email sending to test form:

```typescript
// In app/api/contact/route.ts
export async function POST(request: Request) {
	const body = await request.json()
	console.log("📧 Form submission:", body)

	// Comment out email sending
	// await resend.emails.send(...)

	return NextResponse.json({ success: true })
}
```

### Option 2: Use mailto: Link

Simple fallback in `ContactForm.tsx`:

```typescript
<a
  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}?subject=Contact from ${formData.name}&body=${formData.message}`}
  className="btn-primary"
>
  Send Email
</a>
```

### Option 3: Use Google Forms

1. Create Google Form
2. Get embed link
3. Replace contact section with iframe

## Debug Commands

```bash
# Check environment variables are loaded
npm run dev
# Then in another terminal:
curl http://localhost:3000/api/contact \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","interest":"beta","lang":"en"}'

# Should see logs in dev server terminal
```

## Contact for Help

If still having issues:

1. Check Resend status: https://status.resend.com
2. Resend docs: https://resend.com/docs
3. Resend support: support@resend.com

---

**Most Common Solution:** Restart dev server after updating `.env.local` 🔄
