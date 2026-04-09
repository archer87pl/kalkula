#!/bin/bash
# Skrypt do lokalnego testowania production build

echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  echo ""
  echo "📂 Output directory: ./out"
  echo ""
  echo "🚀 Starting local server..."
  echo "📍 Open: http://localhost:3000"
  echo ""
  echo "Press Ctrl+C to stop the server"
  echo ""
  npx serve out -l 3000
else
  echo "❌ Build failed!"
  exit 1
fi
