# Skrypt do lokalnego testowania production build (Windows PowerShell)

Write-Host "🔨 Building project..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📂 Output directory: .\out" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🚀 Starting local server..." -ForegroundColor Cyan
    Write-Host "📍 Open: http://localhost:3000" -ForegroundColor Blue
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    
    npx serve out -l 3000
}
else {
    Write-Host "`n❌ Build failed!" -ForegroundColor Red
    exit 1
}
