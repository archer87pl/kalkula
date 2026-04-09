# 🚀 Checklist - Deployment na GitHub Pages

## ✅ Przed pierwszym deploymentem

### 1. Push kodu na GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/kalkula.git
git push -u origin main
```

**Zamień `USERNAME/kalkula` na swoją nazwę użytkownika i repozytorium!**

---

### 2. Włącz GitHub Pages

1. Przejdź do **Settings** → **Pages**
2. W sekcji **Source** wybierz: **GitHub Actions**
3. Zapisz

---

### 3. Ustaw permissions dla Actions

1. Przejdź do **Settings** → **Actions** → **General**
2. W sekcji **Workflow permissions**:
   - ✅ Wybierz **Read and write permissions**
   - ✅ Zaznacz **Allow GitHub Actions to create and approve pull requests**
3. Kliknij **Save**

---

### 4. Zaktualizuj README.md

W pliku `README.md` zamień `USERNAME` na swoją nazwę użytkownika GitHub:

```markdown
![Deploy Status](https://github.com/TWOJA-NAZWA/kalkula/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
```

---

### 5. Skonfiguruj basePath (opcjonalnie)

**Jeśli Twoje repozytorium NIE nazywa się `USERNAME.github.io`:**

1. Otwórz `next.config.js`
2. Zaktualizuj konfigurację:

```js
const isProd = process.env.NODE_ENV === 'production'
const repoName = 'kalkula' // <-- Zamień na nazwę SWOJEGO repo

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}` : '',
};

module.exports = nextConfig;
```

**⚠️ Pomiń ten krok jeśli używasz własnej domeny (CNAME)!**

---

### 6. (Opcjonalnie) Konfiguracja własnej domeny

Jeśli **NIE** używasz własnej domeny, usuń plik:
```bash
rm public/CNAME
```

Jeśli **TAK** używasz własnej domeny:

1. Zostaw plik `public/CNAME` z Twoją domeną
2. Skonfiguruj DNS u dostawcy domeny:
   - **Typ A** na adresy IP GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - LUB **Typ CNAME** na `USERNAME.github.io`
3. W **Settings → Pages** ustaw **Custom domain**
4. Zaznacz **Enforce HTTPS**

---

## 🎯 Uruchom deployment

### Automatyczny (po push do main)
```bash
git add .
git commit -m "Configure GitHub Pages"
git push
```

### Ręczny
1. Przejdź do **Actions**
2. Wybierz **Deploy to GitHub Pages**
3. Kliknij **Run workflow** → **Run workflow**

---

## 📊 Sprawdź status

1. Przejdź do **Actions** w repozytorium
2. Zobacz najnowszy workflow run
3. Po zakończeniu (zielony checkmark) strona będzie dostępna!

---

## 🌐 URL strony

Po pomyślnym deploymencie:

### Z własną domeną (CNAME):
```
https://kalkula.pl
```

### Bez własnej domeny (GitHub Pages):
```
https://USERNAME.github.io/kalkula/
```

**Zastąp `USERNAME` swoją nazwą użytkownika GitHub!**

---

## 🐛 Troubleshooting

### ❌ Workflow się nie uruchamia
- Sprawdź czy jest plik `.github/workflows/deploy.yml`
- Sprawdź czy permissions są ustawione (krok 3)

### ❌ Build się nie udaje
- Sprawdź logi w **Actions**
- Uruchom lokalnie: `npm run build`

### ❌ Strona pokazuje 404
- Sprawdź czy GitHub Pages jest włączony (krok 2)
- Poczekaj 1-2 minuty po deploymencie
- Sprawdź czy używasz poprawnego URL

### ❌ Assets/CSS się nie ładują
- Sprawdź czy plik `public/.nojekyll` istnieje
- Sprawdź czy `basePath` w `next.config.js` jest poprawny

### ❌ Własna domena nie działa
- Sprawdź DNS (może potrwać do 24h)
- Sprawdź czy plik `public/CNAME` zawiera poprawną domenę
- Sprawdź ustawienia w **Settings → Pages**

---

## ✅ Podsumowanie - Minimalne kroki

1. ✅ Push kodu na GitHub (`main` branch)
2. ✅ Settings → Pages → Source: **GitHub Actions**
3. ✅ Settings → Actions → Workflow permissions: **Read and write**
4. ✅ Poczekaj na zakończenie workflow (1-3 minuty)
5. ✅ Gotowe! Strona online 🎉

---

**Potrzebujesz pomocy?** Zobacz [DEPLOYMENT.md](./DEPLOYMENT.md) dla szczegółowych instrukcji.
