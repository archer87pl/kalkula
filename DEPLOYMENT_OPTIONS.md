# Opcje Deploymentu

Projekt Kalkula.pl używa **Next.js Static Export** i generuje czysto statyczne pliki HTML/CSS/JS. Możesz go hostować na dowolnej platformie obsługującej statyczne strony.

## 🚀 Dostępne opcje

### 1. GitHub Pages (domyślnie) ⭐

**Zalety:**
- ✅ Darmowy hosting
- ✅ SSL/HTTPS automatycznie
- ✅ Automatyczny deployment z GitHub Actions
- ✅ Własna domena (CNAME)
- ✅ CDN globalnie

**Setup:** Zobacz [DEPLOYMENT.md](./DEPLOYMENT.md)

**URL:** `https://username.github.io/kalkula/` lub własna domena

---

### 2. Vercel

**Zalety:**
- ✅ Darmowy (hobby)
- ✅ Błyskawiczny deployment
- ✅ Automatyczny SSL
- ✅ Edge CDN
- ✅ Preview deployments

**Setup:**
```bash
npm i -g vercel
vercel
```

Lub przez GitHub integration: https://vercel.com/new

**URL:** `https://kalkula.vercel.app` lub własna domena

---

### 3. Netlify

**Zalety:**
- ✅ Darmowy starter
- ✅ Continuous deployment
- ✅ Edge CDN
- ✅ Forms (bez backendu)
- ✅ Functions (Netlify Edge)

**Setup:**
1. Połącz repo GitHub z Netlify
2. Build command: `npm run build`
3. Publish directory: `out`

Lub przez CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=out
```

**URL:** `https://kalkula.netlify.app` lub własna domena

---

### 4. Cloudflare Pages

**Zalety:**
- ✅ Darmowy (unlimited)
- ✅ Globalny CDN
- ✅ DDoS protection
- ✅ Web Analytics darmowe
- ✅ Workers (edge compute)

**Setup:**
1. Połącz repo GitHub z Cloudflare Pages
2. Framework: Next.js
3. Build command: `npm run build`
4. Output directory: `out`

**URL:** `https://kalkula.pages.dev` lub własna domena

---

### 5. Firebase Hosting

**Zalety:**
- ✅ Darmowy (Spark plan)
- ✅ Globalny CDN
- ✅ SSL automatycznie
- ✅ Własna domena
- ✅ Integracja z Firebase

**Setup:**
```bash
npm i -g firebase-tools
firebase init hosting
# Build directory: out
# Rewrite wszystkich URL do /index.html: No (statyczny export)
firebase deploy
```

**URL:** `https://kalkula.web.app` lub własna domena

---

### 6. AWS S3 + CloudFront

**Zalety:**
- ✅ Skalowalny
- ✅ CDN (CloudFront)
- ✅ Kontrola kosztów
- ✅ Integracja AWS

**Wady:**
- ⚠️ Wymaga konfiguracji
- 💰 Płatny (tani)

**Setup:**
1. Stwórz S3 bucket
2. Włącz Static Website Hosting
3. Upload `out/` do S3
4. Skonfiguruj CloudFront distribution
5. Ustaw SSL (ACM)

---

### 7. Azure Static Web Apps

**Zalety:**
- ✅ Darmowy (Free tier)
- ✅ GitHub Actions integration
- ✅ Globalny CDN
- ✅ Własna domena

**Setup:**
1. Stwórz Static Web App w Azure Portal
2. Połącz z repo GitHub
3. Automatyczny deployment via GitHub Actions

**URL:** `https://kalkula.azurestaticapps.net` lub własna domena

---

### 8. Surge.sh

**Zalety:**
- ✅ Szybki deployment
- ✅ Darmowy dla projektów open source
- ✅ Prosty w użyciu

**Setup:**
```bash
npm i -g surge
npm run build
cd out
surge
```

**URL:** `kalkula.surge.sh` lub własna domena

---

### 9. Render

**Zalety:**
- ✅ Darmowy (Free tier)
- ✅ Auto-deploy z GitHub
- ✅ SSL automatycznie

**Setup:**
1. Połącz repo GitHub z Render
2. Environment: Static Site
3. Build command: `npm run build`
4. Publish directory: `out`

**URL:** `https://kalkula.onrender.com` lub własna domena

---

### 10. Własny serwer (VPS/Shared Hosting)

**Opcja A: Nginx/Apache**

```bash
# Build lokalnie
npm run build

# Skopiuj pliki na serwer
scp -r out/* user@server:/var/www/html/
```

Konfiguracja Nginx:
```nginx
server {
    listen 80;
    server_name kalkula.pl;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }
}
```

**Opcja B: Docker**

```dockerfile
FROM nginx:alpine
COPY out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t kalkula .
docker run -p 80:80 kalkula
```

---

## 📊 Porównanie

| Platforma | Darmowy | Łatwość | CDN | SSL | CI/CD |
|-----------|---------|---------|-----|-----|-------|
| GitHub Pages | ✅ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| Vercel | ✅ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| Netlify | ✅ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| Cloudflare | ✅ | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| Firebase | ✅ | ⭐⭐⭐⭐ | ✅ | ✅ | ⚠️ |
| AWS | 💰 | ⭐⭐ | ✅ | ✅ | ⚠️ |
| Azure | ✅ | ⭐⭐⭐ | ✅ | ✅ | ✅ |
| Surge | ✅ | ⭐⭐⭐⭐⭐ | ⚠️ | ✅ | ❌ |
| Render | ✅ | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| VPS | 💰 | ⭐ | ⚠️ | ⚠️ | ⚠️ |

---

## 🎯 Rekomendacje

**Dla hobbystów:** GitHub Pages lub Vercel  
**Dla biznesu:** Cloudflare Pages lub Vercel  
**Dla enterprise:** AWS S3 + CloudFront lub Azure  
**Najszybszy setup:** Surge.sh  
**Najlepszy darmowy:** Cloudflare Pages (unlimited)

---

## 🔧 Testowanie lokalne przed deploymentem

```bash
# Build production
npm run build

# Testuj lokalnie
npm run preview
# lub
npm run serve
```

Otwórz http://localhost:3000 i sprawdź czy wszystko działa.

---

**Aktualnie skonfigurowany:** GitHub Pages + CNAME (kalkula.pl)

Aby zmienić platformę, usuń/zaktualizuj:
- `.github/workflows/deploy.yml` (GitHub Actions)
- `public/CNAME` (custom domain dla GitHub Pages)
