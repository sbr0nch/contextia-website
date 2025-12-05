# 🌱 Contextia Landing Page

**Bilingual (EN/IT) landing page for Contextia startup**

## ✅ What's Ready

All files have been created! The project structure is complete:

```
contextia-landing/
├── app/
│   ├── layout.tsx          ✅ Root layout
│   ├── page.tsx            ✅ Main page
│   ├── globals.css         ✅ Global styles
│   └── api/contact/
│       └── route.ts        ✅ Contact form API
├── components/
│   ├── Hero.tsx            ✅ Hero section
│   ├── Problem.tsx         ✅ Problem section
│   ├── Solution.tsx        ✅ Solution section
│   ├── Differentiators.tsx ✅ Why different
│   ├── Vision.tsx          ✅ Future vision
│   ├── ContactForm.tsx     ✅ Contact form
│   ├── Footer.tsx          ✅ Footer
│   └── LanguageSwitcher.tsx ✅ EN/IT switcher
├── content/
│   ├── en.ts               ✅ English content
│   └── it.ts               ✅ Italian content
├── package.json            ✅ Dependencies
├── tsconfig.json           ✅ TypeScript config
├── tailwind.config.ts      ✅ Tailwind config
├── next.config.js          ✅ Next.js config
├── .env.example            ✅ Environment template
└── .gitignore              ✅ Git ignore
```

## 🚀 Quick Start (3 Steps)

### Step 1: Configure Environment

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your details:

```env
# Get API key from https://resend.com (free tier: 3,000 emails/month)
RESEND_API_KEY=re_your_key_here

# Your contact email
CONTACT_EMAIL=hello@contextia.dev

# Site URL
NEXT_PUBLIC_SITE_URL=https://contextia.dev

# Contact info (displayed on site)
NEXT_PUBLIC_PHONE=+39 XXX XXX XXXX
NEXT_PUBLIC_WHATSAPP=39XXXXXXXXXX
NEXT_PUBLIC_EMAIL=hello@contextia.dev
NEXT_PUBLIC_LINKEDIN=yourname
```

### Step 2: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

You should see:

- ✅ Hero section with "CONTEXTIA" logo
- ✅ Language switcher (EN/IT) in top right
- ✅ All sections loading
- ✅ Contact form working

### Step 3: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## 🌐 Connect Domain (contextia.dev)

### In Vercel Dashboard:

1. Go to your project
2. Settings → Domains
3. Click "Add Domain"
4. Enter `contextia.dev`
5. Vercel will show you nameservers (e.g., ns1.vercel-dns.com)

### At Your Domain Registrar:

1. Find DNS settings for contextia.dev
2. Change nameservers to Vercel's nameservers
3. Save changes
4. Wait 1-24 hours for DNS propagation

### Verify DNS:

```bash
# Check if DNS is propagated
nslookup contextia.dev

# Or use online tool
# https://dnschecker.org
```

## 📧 Email Setup (Resend)

### Get API Key:

1. Go to https://resend.com
2. Sign up (free tier: 3,000 emails/month)
3. Dashboard → API Keys → Create API Key
4. Copy key to `.env.local`

### Verify Domain (Optional but Recommended):

1. Resend Dashboard → Domains
2. Add domain: `contextia.dev`
3. Add DNS records shown by Resend
4. Wait for verification
5. Update `from` email in `app/api/contact/route.ts`:
    ```typescript
    from: "Contextia <hello@contextia.dev>"
    ```

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: "#00D084", // Your green
  dark: {
    DEFAULT: "#0A0A0A",
    lighter: "#1A1A1A",
    border: "#2A2A2A",
  },
}
```

### Change Content

Edit `content/en.ts` and `content/it.ts`

### Add Logo

1. Add `logo.svg` or `logo.png` to `public/`
2. Update `components/Hero.tsx` and `components/Footer.tsx`

## 🔧 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Form Not Sending

1. Check `RESEND_API_KEY` in `.env.local`
2. Check Vercel environment variables (Settings → Environment Variables)
3. Check Vercel logs (Deployments → Select deployment → Logs)

### Domain Not Working

1. Verify nameservers are updated
2. Wait 24-48 hours for full propagation
3. Clear browser cache
4. Try incognito mode

## 📱 Features

- ✅ **Bilingual** (EN/IT) with instant switching
- ✅ **Dark mode** design with green accents
- ✅ **Responsive** mobile-first layout
- ✅ **Animated** smooth scroll animations
- ✅ **Contact form** with email notifications
- ✅ **Direct contact** WhatsApp, Email, LinkedIn
- ✅ **SEO optimized** meta tags
- ✅ **Fast** <2s loading time

## 🎯 For Startup Event

Perfect for presenting with QR code:

- Clean, professional design
- Bilingual (English + Italian)
- Clear value proposition
- Easy contact options
- Mobile-friendly

## 📊 Analytics (Optional)

### Vercel Analytics (Easiest):

```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Plausible (Privacy-Friendly):

Add to `app/layout.tsx` in `<head>`:

```typescript
<script defer data-domain="contextia.dev" src="https://plausible.io/js/script.js"></script>
```

## 💰 Costs

**Everything is FREE:**

- ✅ Vercel hosting (free tier)
- ✅ Resend emails (3K/month free)
- ✅ Next.js (open source)
- ✅ Domain (you already own it)

**Total: €0/month** 🎉

## 🚀 Deployment Checklist

- [ ] `npm install` completed
- [ ] `.env.local` configured
- [ ] `npm run dev` works locally
- [ ] All sections display correctly
- [ ] Language switcher works
- [ ] Contact form sends emails
- [ ] Deployed to Vercel
- [ ] Domain connected
- [ ] DNS propagated
- [ ] Tested on mobile
- [ ] Shared with team

## 📞 Support

If you need help:

1. Check this README
2. Check `SETUP_INSTRUCTIONS.md`
3. Check Vercel deployment logs
4. Check browser console for errors

## 🎉 You're Done!

Your bilingual landing page is ready to launch!

**Next steps:**

1. Test locally: `npm run dev`
2. Deploy: `vercel --prod`
3. Connect domain
4. Share at startup event! 🚀🌱

---

**Built with ❤️ for Contextia**
