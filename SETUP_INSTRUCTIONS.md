# 🚀 Contextia Landing - Setup Instructions

## ✅ What's Already Created

I've created the complete project structure with:

### Configuration Files

- ✅ `package.json` - Dependencies
- ✅ `tsconfig.json` - TypeScript config
- ✅ `tailwind.config.ts` - Tailwind CSS config
- ✅ `next.config.js` - Next.js config
- ✅ `postcss.config.js` - PostCSS config
- ✅ `.env.example` - Environment variables template
- ✅ `.gitignore` - Git ignore rules

### Content Files (Bilingual)

- ✅ `content/en.ts` - English content
- ✅ `content/it.ts` - Italian content

### App Files

- ✅ `app/layout.tsx` - Root layout
- ✅ `app/page.tsx` - Main page
- ✅ `app/globals.css` - Global styles

### Components Created

- ✅ `components/LanguageSwitcher.tsx` - EN/IT switcher
- ✅ `components/Hero.tsx` - Hero section

---

## 🔧 NEXT STEPS (Do These Now)

### Step 1: Install Dependencies (5 minutes)

Open Command Prompt (cmd.exe) or PowerShell as Administrator and run:

```bash
cd contextia-landing
npm install
```

This will install all dependencies and fix the TypeScript errors.

### Step 2: Create Remaining Components (Copy-Paste)

Create these files in `components/` folder:

#### `components/Problem.tsx`

```typescript
"use client";

import { motion } from "framer-motion";

export default function Problem({ content }: { content: any }) {
  return (
    <section id="problem" className="section bg-dark-lighter">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
        <p className="text-xl text-gray-400">{content.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {content.items.map((item: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="card text-center"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-primary">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

#### `components/Solution.tsx`

```typescript
"use client";

import { motion } from "framer-motion";

export default function Solution({ content }: { content: any }) {
  return (
    <section id="solution" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
        <p className="text-xl text-gray-400">{content.subtitle}</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-400">{content.before}</h3>
              <p className="text-lg mb-2">{content.demo.before}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">{content.after}</h3>
              <p className="text-lg mb-2">{content.demo.after}</p>
            </div>
          </div>

          <div className="border-t border-dark-border pt-8">
            <h3 className="text-xl font-bold mb-4 text-primary">{content.saved}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{content.demo.savings}</p>
                <p className="text-gray-400">Tokens</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{content.demo.cost}</p>
                <p className="text-gray-400">Cost</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{content.demo.co2}</p>
                <p className="text-gray-400">Environmental</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### `components/Differentiators.tsx`

```typescript
"use client";

import { motion } from "framer-motion";

export default function Differentiators({ content }: { content: any }) {
  return (
    <section className="section bg-dark-lighter">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold">{content.title}</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {content.items.map((item: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

#### `components/Vision.tsx`

```typescript
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Vision({ content }: { content: any }) {
  return (
    <section id="vision" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
        <p className="text-xl text-gray-400">{content.subtitle}</p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <div className="card">
          <ul className="space-y-4 mb-8">
            {content.features.map((feature: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-lg">{feature}</span>
              </motion.li>
            ))}
          </ul>

          <div className="text-center">
            <a href="#contact" className="btn-primary">
              {content.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### `components/ContactForm.tsx`

```typescript
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, Linkedin, Calendar } from "lucide-react";

export default function ContactForm({ content, lang }: { content: any; lang: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "beta",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lang }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", interest: "beta", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section bg-dark-lighter">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
        <p className="text-xl text-gray-400">{content.subtitle}</p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder={content.form.name}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder={content.form.email}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder={content.form.company}
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:border-primary focus:outline-none"
              >
                <option value="beta">{content.form.interests.beta}</option>
                <option value="pilot">{content.form.interests.pilot}</option>
                <option value="partnership">{content.form.interests.partnership}</option>
                <option value="advisory">{content.form.interests.advisory}</option>
                <option value="other">{content.form.interests.other}</option>
              </select>
            </div>

            <div>
              <textarea
                placeholder={content.form.message}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {status === "loading" ? "..." : content.form.submit}
            </button>

            {status === "success" && (
              <p className="text-primary text-center">{content.form.success}</p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-center">{content.form.error}</p>
            )}
          </form>
        </div>

        {/* Direct Contact */}
        <div className="card">
          <h3 className="text-2xl font-bold mb-6">{content.direct.title}</h3>
          <div className="space-y-4">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-dark rounded-lg hover:border-primary border border-dark-border transition-all"
            >
              <Phone className="w-6 h-6 text-primary" />
              <span>{content.direct.whatsapp}</span>
            </a>

            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              className="flex items-center gap-3 p-4 bg-dark rounded-lg hover:border-primary border border-dark-border transition-all"
            >
              <Mail className="w-6 h-6 text-primary" />
              <span>{content.direct.email}</span>
            </a>

            <a
              href={`https://linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-dark rounded-lg hover:border-primary border border-dark-border transition-all"
            >
              <Linkedin className="w-6 h-6 text-primary" />
              <span>{content.direct.linkedin}</span>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 p-4 bg-dark rounded-lg hover:border-primary border border-dark-border transition-all"
            >
              <Calendar className="w-6 h-6 text-primary" />
              <span>{content.direct.calendar}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### `components/Footer.tsx`

```typescript
"use client";

import { Sparkles } from "lucide-react";

export default function Footer({ content }: { content: any }) {
  return (
    <footer className="section bg-dark-lighter border-t border-dark-border">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-primary text-3xl font-bold mb-4">
          <Sparkles className="w-8 h-8" />
          <span>CONTEXTIA</span>
        </div>
        <p className="text-gray-400 mb-8">{content.tagline}</p>
        <p className="text-gray-600 text-sm">{content.copyright}</p>
      </div>
    </footer>
  );
}
```

### Step 3: Create API Route

Create `app/api/contact/route.ts`:

```typescript
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { name, email, company, interest, message, lang } = body

		// Send email notification
		await resend.emails.send({
			from: "Contextia <onboarding@resend.dev>", // Change after domain verification
			to: process.env.CONTACT_EMAIL || "hello@contextia.dev",
			subject: `New Contact from ${name} (${interest})`,
			html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
        <p><strong>Language:</strong> ${lang}</p>
      `,
		})

		// Send auto-reply
		await resend.emails.send({
			from: "Contextia <onboarding@resend.dev>",
			to: email,
			subject: lang === "it" ? "Grazie per il tuo interesse!" : "Thanks for your interest!",
			html:
				lang === "it"
					? `<p>Ciao ${name},</p><p>Grazie per l'interesse in Contextia! Ti risponderemo entro 24 ore.</p>`
					: `<p>Hi ${name},</p><p>Thanks for your interest in Contextia! We'll respond within 24 hours.</p>`,
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Contact form error:", error)
		return NextResponse.json({ error: "Failed to send" }, { status: 500 })
	}
}
```

### Step 4: Create .env.local

Copy `.env.example` to `.env.local` and fill in your details:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL=hello@contextia.dev
NEXT_PUBLIC_SITE_URL=https://contextia.dev
NEXT_PUBLIC_PHONE=+39 XXX XXX XXXX
NEXT_PUBLIC_WHATSAPP=39XXXXXXXXXX
NEXT_PUBLIC_EMAIL=hello@contextia.dev
NEXT_PUBLIC_LINKEDIN=yourname
```

### Step 5: Test Locally

```bash
npm run dev
```

Open http://localhost:3000

### Step 6: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Step 7: Connect Domain

1. Go to Vercel dashboard
2. Project Settings → Domains
3. Add `contextia.dev`
4. Update nameservers at your domain registrar
5. Wait 1-24 hours

---

## 🎉 YOU'RE DONE!

Your bilingual landing page is ready with:

- ✅ English/Italian language switcher
- ✅ Modern dark design with green accents
- ✅ Animated sections
- ✅ Contact form with email notifications
- ✅ Mobile responsive
- ✅ SEO optimized
- ✅ Fast loading

---

## 📞 Need Help?

If you encounter any issues:

1. Check that all files are created
2. Run `npm install` again
3. Check `.env.local` is configured
4. Check Vercel deployment logs

**The site will be live at contextia.dev after DNS propagation!** 🚀🌱
