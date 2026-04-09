# Deployment do GitHub Pages

Ten projekt jest automatycznie deployowany na GitHub Pages przy każdym push do brancha `main`.

## Konfiguracja początkowa

### 1. Włącz GitHub Pages w repozytorium

1. Przejdź do **Settings** → **Pages** w swoim repozytorium GitHub
2. W sekcji **Source** wybierz **GitHub Actions**
3. Zapisz zmiany

### 2. Upewnij się, że workflow ma uprawnienia

1. Przejdź do **Settings** → **Actions** → **General**
2. W sekcji **Workflow permissions** wybierz **Read and write permissions**
3. Zaznacz **Allow GitHub Actions to create and approve pull requests**
4. Zapisz

## Jak działa deployment?

Workflow `.github/workflows/deploy.yml` automatycznie:

1. **Triggeruje się** przy każdym push do brancha `main`
2. **Instaluje zależności** (`npm ci`)
3. **Buduje projekt** (`npm run build`) - tworzy statyczne pliki w folderze `out/`
4. **Uploaduje** zawartość `out/` do GitHub Pages
5. **Deployuje** na GitHub Pages

## Ręczne uruchomienie deploymentu

Możesz ręcznie uruchomić deployment:

1. Przejdź do zakładki **Actions** w repozytorium
2. Wybierz workflow **Deploy to GitHub Pages**
3. Kliknij **Run workflow** → **Run workflow**

## Jak sprawdzić status deploymentu?

1. Przejdź do zakładki **Actions** w repozytorium
2. Zobaczysz listę ostatnich workflow runs
3. Kliknij na konkretny run żeby zobaczyć szczegóły

## URL strony

Po pomyślnym deploymencie, strona będzie dostępna pod adresem:

```
https://<twoja-nazwa>.github.io/<nazwa-repo>/
```

Lub jeśli używasz własnej domeny:
```
https://twoja-domena.pl
```

## Konfiguracja dla niestandardowej ścieżki bazowej

Jeśli Twoje repozytorium NIE jest `<username>.github.io`, wtedy strona będzie pod ścieżką:
`https://<username>.github.io/<repo-name>/`

W takim przypadku **zaktualizuj** `next.config.js`:

```js
const isProd = process.env.NODE_ENV === 'production'
const repoName = 'kalkula' // zmień na nazwę swojego repo

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}` : '',
};

module.exports = nextConfig;
```

## Cache

Workflow używa cache dla:
- `node_modules` (automatycznie przez `actions/setup-node`)
- `.next/cache` (Next.js build cache)

To przyspiesza kolejne buildy.

## Troubleshooting

### Deployment się nie udaje

1. Sprawdź logi w zakładce **Actions**
2. Upewnij się, że permissions są ustawione poprawnie (patrz "Konfiguracja początkowa")
3. Sprawdź czy `npm run build` działa lokalnie

### Strona pokazuje 404

1. Sprawdź czy GitHub Pages jest włączony (Settings → Pages)
2. Sprawdź czy używasz poprawnego URL
3. Jeśli repo nie jest `<username>.github.io`, dodaj `basePath` w `next.config.js`

### Assets/CSS się nie ładują

1. Sprawdź czy plik `public/.nojekyll` istnieje
2. Dodaj `assetPrefix` w `next.config.js` (jeśli używasz ścieżki bazowej)

## Lokalne testowanie production build

```bash
# Build projektu
npm run build

# Podejrzyj zawartość folderu out/
# Możesz użyć dowolnego HTTP servera, np:
npx serve out
```

## Własna domena

Aby użyć własnej domeny:

1. Dodaj plik `public/CNAME` z Twoją domeną:
   ```
   kalkula.pl
   ```

2. Skonfiguruj DNS u swojego dostawcy domeny:
   - Typ `A` na IP GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Lub typ `CNAME` na `<username>.github.io`

3. W Settings → Pages ustaw Custom domain

4. Zaznacz "Enforce HTTPS"
