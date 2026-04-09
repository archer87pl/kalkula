# Troubleshooting GitHub Actions

## Problem: npm ci - package.json i package-lock.json out of sync

### Objaw błędu:
```
npm error `npm ci` can only install packages when your package.json and package-lock.json are in sync.
npm error Missing: @types/node@XX.X.X from lock file
npm error Missing: some-package@X.X.X from lock file
```

### Przyczyny:
1. **Niezgodność wersji** - package-lock.json nie zawiera pakietów wymaganych przez package.json
2. **Cache node_modules** - GitHub Actions używa cache'u ze starymi zależnościami
3. **Konflikt peer dependencies** - zależności wymagają nowszych wersji

### Rozwiązanie:

#### Krok 1: Aktualizuj zależności lokalnie
```bash
# Usuń node_modules i package-lock.json (opcjonalnie)
rm -rf node_modules
rm package-lock.json

# Zainstaluj świeże zależności
npm install

# Lub zaktualizuj konkretny pakiet
npm install --save-dev @types/node@^22.12.0

# Sprawdź czy build działa
npm run build
```

#### Krok 2: Testuj npm ci lokalnie
```bash
# To dokładnie to, co robi GitHub Actions
npm ci

# Jeśli działa lokalnie, zadziała też na CI
npm run build
```

#### Krok 3: Commit i push
```bash
git add package.json package-lock.json
git commit -m "Update dependencies to fix npm ci"
git push origin main
```

#### Krok 4 (jeśli problem się powtarza): Wyczyść cache w workflow

W pliku `.github/workflows/deploy.yml`:

**Opcja A**: Usuń cache dla node_modules (zalecane)
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    # cache: 'npm'  <-- Usuń tę linię
```

**Opcja B**: Zmień cache key
```yaml
- name: Cache dependencies
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}-v2
    #                                                                    ^^^ zwiększ wersję
```

**Opcja C**: Wyczyść cache ręcznie
1. Przejdź do **Actions** → **Caches** w GitHub
2. Znajdź i usuń stare cache dla node_modules
3. Re-run workflow

### Zapobieganie problemom:

1. **Zawsze commituj package-lock.json**
   ```bash
   # NIE dodawaj tego do .gitignore
   # package-lock.json
   ```

2. **Regularnie aktualizuj zależności**
   ```bash
   npm update
   npm audit fix
   ```

3. **Używaj npm ci lokalnie przed push**
   ```bash
   npm ci && npm run build
   ```

4. **Nie mieszaj npm i yarn**
   - Jeśli używasz npm, usuń yarn.lock
   - Jeśli używasz yarn, usuń package-lock.json

---

## Problem: Stare wersje po aktualizacji

### Objaw:
Zaktualizowałeś pakiet, ale CI wciąż używa starej wersji.

### Rozwiązanie:
```bash
# Upewnij się że package-lock.json jest aktualny
npm install

# Force update lock file
rm package-lock.json
npm install

# Commit i push
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

---

## Problem: Conflicts with peer dependencies

### Objaw:
```
npm warn ERESOLVE overriding peer dependency
npm warn Conflicting peer dependency: @types/node@XX.X.X
```

### Rozwiązanie:
```bash
# Zaktualizuj pakiet do zgodnej wersji
npm install --save-dev @types/node@^22.12.0

# Lub użyj --legacy-peer-deps (niezalecane)
npm install --legacy-peer-deps
```

---

## Szybka diagnoza

```bash
# 1. Sprawdź czy package.json i package-lock.json są zsynchronizowane
npm ls

# 2. Sprawdź czy npm ci działa lokalnie
npm ci

# 3. Sprawdź node i npm version
node --version   # powinno być zgodne z workflow
npm --version

# 4. Sprawdź logi GitHub Actions
# Actions → wybrany workflow → View raw logs

# 5. Re-run workflow bez cache
# Actions → wybrany workflow → Re-run jobs → Re-run all jobs
```

---

## Monitoring GitHub Actions

### Sprawdź status workflow:
```bash
# Lokalnie
git push origin main
# Następnie przejdź do:
# https://github.com/USERNAME/REPO/actions

# Lub użyj GitHub CLI
gh run list
gh run view <run-id>
```

### Badge w README:
```markdown
![Deploy Status](https://github.com/USERNAME/REPO/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
```

---

**Historia tego problemu:**
- 2026-04-09: Zaktualizowano @types/node z 20.14.11 → 22.19.17 (wymagane przez vitest 3.2.4)
- Usunięto cache: 'npm' z workflow, żeby zapobiec konfliktom cache
- npm ci teraz instaluje świeże zależności bez cache node_modules
