# 🚀 Guida Deploy su Vercel - Contextia Landing Page

## Metodo 1: Deploy Automatico da GitHub (Consigliato)

### Step 1: Prepara il Repository

```bash
cd contextia-landing
git init
git add .
git commit -m "Initial commit - Contextia landing page"
```

### Step 2: Crea Repository su GitHub

1. Vai su https://github.com/new
2. Crea un nuovo repository (es: `contextia-landing`)
3. NON inizializzare con README

### Step 3: Push su GitHub

```bash
git remote add origin https://github.com/TUO-USERNAME/contextia-landing.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy su Vercel

1. Vai su https://vercel.com
2. Clicca "Add New" → "Project"
3. Importa il repository GitHub `contextia-landing`
4. Vercel rileverà automaticamente Next.js
5. Configura le variabili d'ambiente (vedi sotto)
6. Clicca "Deploy"

### Step 5: Variabili d'Ambiente

Nel dashboard Vercel, vai su Settings → Environment Variables e aggiungi:

```env
NEXT_PUBLIC_WHATSAPP=+393123456789
NEXT_PUBLIC_EMAIL=info@contextia.com
NEXT_PUBLIC_LINKEDIN=your-linkedin-username
RESEND_API_KEY=re_your_api_key_here
```

---

## Metodo 2: Deploy Diretto con Vercel CLI

### Step 1: Installa Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy

```bash
cd contextia-landing
vercel
```

Segui le istruzioni:

- Set up and deploy? **Y**
- Which scope? Seleziona il tuo account
- Link to existing project? **N**
- What's your project's name? **contextia-landing**
- In which directory is your code located? **./**
- Want to override the settings? **N**

### Step 4: Deploy in Produzione

```bash
vercel --prod
```

---

## Metodo 3: Deploy da Vercel Dashboard (Più Semplice)

### Step 1: Prepara il Progetto

Assicurati che il progetto sia pronto:

```bash
cd contextia-landing
npm run build  # Testa che compili correttamente
```

### Step 2: Crea un Account Vercel

1. Vai su https://vercel.com/signup
2. Registrati con GitHub, GitLab o email

### Step 3: Import Project

1. Clicca "Add New" → "Project"
2. Seleziona "Import Git Repository"
3. Se non hai GitHub, usa "Import from Git" e incolla l'URL

### Step 4: Configura il Deploy

Vercel rileverà automaticamente:

- **Framework Preset**: Next.js
- **Root Directory**: ./
- **Build Command**: `npm run build`
- **Output Directory**: .next

### Step 5: Aggiungi Variabili d'Ambiente

```env
NEXT_PUBLIC_WHATSAPP=+393123456789
NEXT_PUBLIC_EMAIL=info@contextia.com
NEXT_PUBLIC_LINKEDIN=your-linkedin-username
RESEND_API_KEY=re_your_api_key_here
```

### Step 6: Deploy!

Clicca "Deploy" e aspetta 2-3 minuti.

---

## 📧 Configurazione Email (Resend)

### Step 1: Crea Account Resend

1. Vai su https://resend.com
2. Registrati gratuitamente
3. Verifica la tua email

### Step 2: Ottieni API Key

1. Dashboard → API Keys
2. Crea una nuova API key
3. Copia la key (inizia con `re_`)

### Step 3: Aggiungi a Vercel

```env
RESEND_API_KEY=re_your_actual_key_here
```

### Step 4: Verifica Domain (Opzionale)

Per email professionali:

1. Resend Dashboard → Domains
2. Aggiungi il tuo dominio
3. Configura i record DNS
4. Aspetta verifica (5-10 minuti)

---

## 🌐 Dominio Personalizzato

### Opzione 1: Dominio Vercel Gratuito

Vercel ti dà automaticamente:

- `contextia-landing.vercel.app`
- `contextia-landing-username.vercel.app`

### Opzione 2: Dominio Personalizzato

1. Acquista dominio (es: contextia.com)
2. Vercel Dashboard → Settings → Domains
3. Aggiungi il tuo dominio
4. Configura DNS:

    ```
    Type: A
    Name: @
    Value: 76.76.21.21

    Type: CNAME
    Name: www
    Value: cname.vercel-dns.com
    ```

---

## 🔄 Aggiornamenti Automatici

Una volta collegato a GitHub:

1. Ogni push su `main` → Deploy automatico in produzione
2. Ogni push su altri branch → Preview deployment
3. Pull Request → Preview automatico

---

## ✅ Checklist Pre-Deploy

- [ ] Tutte le immagini sono in `/public`
- [ ] File `.env.local` NON è committato (è in `.gitignore`)
- [ ] `npm run build` funziona senza errori
- [ ] Variabili d'ambiente configurate
- [ ] API key Resend ottenuta
- [ ] Contatti (WhatsApp, Email, LinkedIn) aggiornati

---

## 🐛 Troubleshooting

### Build Fallisce

```bash
# Testa localmente
npm run build

# Controlla errori TypeScript
npm run type-check
```

### Immagini Non Si Vedono

- Verifica che siano in `/public`
- Usa path relativi: `/image.png` non `./public/image.png`

### Email Non Funziona

- Verifica API key Resend
- Controlla variabili d'ambiente su Vercel
- Guarda i logs: Vercel Dashboard → Deployments → Function Logs

### Dominio Non Funziona

- Aspetta propagazione DNS (24-48 ore)
- Verifica record DNS con `dig contextia.com`
- Controlla SSL certificate su Vercel

---

## 📊 Monitoring

### Analytics Vercel (Gratis)

- Dashboard → Analytics
- Visualizzazioni pagina
- Performance metrics
- Geo-distribution

### Speed Insights

- Dashboard → Speed Insights
- Core Web Vitals
- Performance score
- Suggerimenti ottimizzazione

---

## 💰 Costi

### Piano Hobby (Gratis)

- ✅ Deploy illimitati
- ✅ 100GB bandwidth/mese
- ✅ SSL automatico
- ✅ Preview deployments
- ✅ Analytics base

### Piano Pro ($20/mese)

- Tutto del piano Hobby +
- 1TB bandwidth
- Password protection
- Analytics avanzati
- Team collaboration

---

## 🎯 URL Finale

Dopo il deploy avrai:

- **Production**: `https://contextia-landing.vercel.app`
- **Preview**: `https://contextia-landing-git-branch.vercel.app`
- **Custom**: `https://contextia.com` (se configurato)

---

## 📱 QR Code per Evento

Dopo il deploy, genera QR code per:

```
https://contextia-landing.vercel.app
```

Strumenti consigliati:

- https://qr-code-generator.com
- https://www.qrcode-monkey.com
- Canva (con design personalizzato)

---

## 🚀 Deploy Rapido (TL;DR)

```bash
# 1. Installa Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd contextia-landing
vercel --prod

# 4. Aggiungi variabili d'ambiente su dashboard
# 5. Fatto! 🎉
```

---

## 📞 Supporto

- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- Next.js Docs: https://nextjs.org/docs
