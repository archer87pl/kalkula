import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = process.cwd();
const publicDir = path.join(root, "public");
const source = path.join(publicDir, "logo.svg");

const sizes = [16, 32, 48, 180, 192, 512];

async function ensureSourceExists() {
  try {
    await fs.access(source);
  } catch {
    throw new Error(`Brak pliku zrodlowego logo: ${source}`);
  }
}

async function createPng(size) {
  const outputPath = path.join(publicDir, `icon-${size}.png`);
  await sharp(source).resize(size, size, { fit: "cover" }).png().toFile(outputPath);
  return outputPath;
}

async function createManifest() {
  const manifest = {
    name: "Kalkula",
    short_name: "Kalkula",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7fb",
    theme_color: "#006c67",
    lang: "pl",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };

  await fs.writeFile(path.join(publicDir, "site.webmanifest"), JSON.stringify(manifest, null, 2));
}

async function run() {
  await ensureSourceExists();

  const pngFiles = [];
  for (const size of sizes) {
    const out = await createPng(size);
    pngFiles.push(out);
  }

  const icoBuffer = await pngToIco(pngFiles.filter((file) => /(16|32|48)\.png$/.test(file)));
  await fs.writeFile(path.join(publicDir, "favicon.ico"), icoBuffer);
  await fs.copyFile(path.join(publicDir, "icon-180.png"), path.join(publicDir, "apple-touch-icon.png"));

  await createManifest();

  console.log("Ikony i favicon zostaly wygenerowane.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
