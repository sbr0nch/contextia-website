# 🌐 Collegare contextia.dev (Cloudflare) a Vercel

## 📋 Panoramica

Hai il dominio `contextia.dev` su Cloudflare e vuoi collegarlo al tuo progetto Vercel.

---

## 🚀 PARTE 1: Configurazione su Vercel

### Step 1: Vai al Dashboard Vercel

1. Apri https://vercel.com/dashboard
2. Clicca sul progetto "Contextia"
3. Vai su **Settings** → **Domains**

### Step 2: Aggiungi il Dominio

1. Nel campo "Domain", scrivi: `contextia.dev`
2. Clicca **Add**
3. Vercel ti mostrerà i record DNS da configurare

### Step 3: Copia i Record DNS

Vercel ti darà questi record (esempio):

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**IMPORTANTE**: Copia questi valori esatti che Vercel ti mostra!

---

## ⚙️ PARTE 2: Configurazione su Cloudflare

### Step 1: Accedi a Cloudflare

1. Vai su https://dash.cloudflare.com
2. Seleziona il dominio `contextia.dev`
3. Vai su **DNS** → **Records**

### Step 2: Configura i Record DNS

#### Record 1: Root Domain (@)

```
Type: A
Name: @ (o contextia.dev)
IPv4 address: 76.76.21.21
Proxy status: DNS only (nuvola grigia, NON arancione)
TTL: Auto
```

**IMPORTANTE**: Disattiva il proxy Cloudflare (nuvola grigia)!

#### Record 2: WWW Subdomain

```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (nuvola grigia)
TTL: Auto
```

### Step 3: Rimuovi Record Conflittuali

Se esistono già record A o CNAME per `@` o `www`, **eliminali** prima di aggiungere i nuovi.

---

## 🔧 PARTE 3: Configurazione Avanzata Cloudflare

### Disabilita il Proxy (IMPORTANTE!)

Per ogni record DNS che hai aggiunto:

1. Clicca sulla **nuvola arancione** 🟠
2. Diventerà **grigia** ⚪
3. Questo disabilita il proxy Cloudflare

**Perché?** Vercel ha bisogno di gestire direttamente il traffico per SSL e routing.

### Impostazioni SSL/TLS

1. Vai su **SSL/TLS** → **Overview**
2. Imposta su: **Full** (non Full Strict)
3. Questo permette a Vercel di gestire il certificato SSL

---

## ⏱️ PARTE 4: Verifica e Attesa

### Verifica su Vercel

1. Torna su Vercel Dashboard → Settings → Domains
2. Dovresti vedere `contextia.dev` con stato "Pending"
3. Aspetta 5-10 minuti per la propagazione DNS

### Controlla lo Stato

```bash
# Verifica DNS (Windows)
nslookup contextia.dev

# Verifica DNS (alternativa)
ping contextia.dev
```

### Tempi di Propagazione

- **Minimo**: 5-10 minuti
- **Normale**: 1-2 ore
- **Massimo**: 24-48 ore (raro)

---

## ✅ PARTE 5: Verifica Finale

### Quando è Pronto?

Su Vercel Dashboard vedrai:

- ✅ `contextia.dev` - Valid Configuration
- 🔒 SSL Certificate - Active

### Testa il Dominio

1. Apri https://contextia.dev
2. Apri https://www.contextia.dev
3. Entrambi dovrebbero mostrare il tuo sito!

---

## 🎯 Configurazione Completa (Riepilogo)

### Su Vercel:

```
Domain: contextia.dev
Status: Valid Configuration
SSL: Active
```

### Su Cloudflare:

```
Record 1:
Type: A
Name: @
Value: 76.76.21.21
Proxy: OFF (grigio)

Record 2:
Type: CNAME
Name: www
Value: cname.vercel-dns.com
Proxy: OFF (grigio)

SSL/TLS: Full
```

---

## 🐛 Troubleshooting

### Problema: "Invalid Configuration"

**Soluzione:**

1. Verifica che il proxy Cloudflare sia DISABILITATO (nuvola grigia)
2. Controlla che i record DNS siano esatti
3. Aspetta 10-15 minuti e riprova

### Problema: "SSL Certificate Error"

**Soluzione:**

1. Cloudflare SSL/TLS → Imposta su "Full"
2. Aspetta che Vercel generi il certificato (5-10 minuti)
3. Forza refresh: Ctrl+F5

### Problema: "DNS_PROBE_FINISHED_NXDOMAIN"

**Soluzione:**

1. DNS non ancora propagato - aspetta 1-2 ore
2. Verifica record DNS su Cloudflare
3. Usa `nslookup contextia.dev` per controllare

### Problema: Redirect Loop

**Soluzione:**

1. Disabilita proxy Cloudflare (nuvola grigia)
2. SSL/TLS su "Full" (non Full Strict)
3. Pulisci cache browser

---

## 🎨 Opzionale: Redirect www → non-www

Se vuoi che `www.contextia.dev` reindirizzi a `contextia.dev`:

### Su Cloudflare:

1. **Page Rules** → Create Page Rule
2. URL: `www.contextia.dev/*`
3. Setting: **Forwarding URL** (301 Permanent Redirect)
4. Destination: `https://contextia.dev/$1`
5. Save

---

## 📊 Verifica Propagazione DNS

### Online Tools:

- https://dnschecker.org
- https://www.whatsmydns.net
- Cerca: `contextia.dev`

### Comandi Locali:

```bash
# Windows
nslookup contextia.dev
nslookup www.contextia.dev

# Verifica record A
nslookup -type=A contextia.dev

# Verifica record CNAME
nslookup -type=CNAME www.contextia.dev
```

---

## 🎉 Risultato Finale

Dopo la configurazione completa:

- ✅ https://contextia.dev → Il tuo sito
- ✅ https://www.contextia.dev → Il tuo sito
- ✅ SSL Certificate → Attivo e sicuro
- ✅ Performance → Ottimizzata da Vercel

---

## 📞 Supporto

### Vercel:

- Docs: https://vercel.com/docs/concepts/projects/domains
- Support: https://vercel.com/support

### Cloudflare:

- Docs: https://developers.cloudflare.com/dns
- Community: https://community.cloudflare.com

---

## 🚀 Quick Start (TL;DR)

```bash
# 1. Su Vercel Dashboard
Settings → Domains → Add "contextia.dev"

# 2. Su Cloudflare DNS
A Record: @ → 76.76.21.21 (proxy OFF)
CNAME: www → cname.vercel-dns.com (proxy OFF)

# 3. Cloudflare SSL/TLS
Mode: Full

# 4. Aspetta 10-30 minuti

# 5. Testa
https://contextia.dev ✅
```

---

## ⚠️ IMPORTANTE: Proxy Cloudflare

**DEVI DISABILITARE IL PROXY** (nuvola grigia) per:

- Record A (@)
- Record CNAME (www)

Altrimenti Vercel non potrà gestire correttamente:

- SSL/TLS
- Routing
- Edge Functions
- Analytics

---

## 🎯 Checklist Finale

- [ ] Dominio aggiunto su Vercel
- [ ] Record A configurato su Cloudflare (proxy OFF)
- [ ] Record CNAME configurato su Cloudflare (proxy OFF)
- [ ] SSL/TLS impostato su "Full"
- [ ] Aspettato 10-30 minuti
- [ ] Testato https://contextia.dev
- [ ] Testato https://www.contextia.dev
- [ ] SSL certificate attivo (lucchetto verde)

Fatto! Il tuo dominio è configurato! 🎉
