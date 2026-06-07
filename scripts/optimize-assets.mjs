/**
 * optimize-assets.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Script optimasi aset gambar untuk SSDC Payakumbuh.
 *
 * Yang dikerjakan:
 * 1. Kompres gambar besar di assets/img → versi WebP (impor diupdate terpisah)
 * 2. Generate favicon set (favicon.ico, favicon-32x32.png, apple-touch-icon.png)
 *    dari source image yang sudah disiapkan.
 * 3. Optimasi OG image ke public/og-image.jpg (1200×630).
 *
 * Jalankan: node scripts/optimize-assets.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 */

import sharp from 'sharp';
import { readFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IMG_DIR = join(ROOT, 'app/assets/img');
const PUBLIC_DIR = join(ROOT, 'public');

// ─── Pastikan direktori ada ────────────────────────────────────────────────
if (!existsSync(join(IMG_DIR, 'webp'))) {
  mkdirSync(join(IMG_DIR, 'webp'), { recursive: true });
}

console.log('🚀 Mulai optimasi aset gambar SSDC...\n');

// ─── 1. Kompres gambar besar → WebP ───────────────────────────────────────
const imagesToConvert = [
  { src: 'bg-hero.jpg',  quality: 75, width: 1920 },
  { src: 'keluarga.png', quality: 80, width: 900  },
  { src: 'overlay.png',  quality: 30, width: null  }, // opacity-10 dekoratif, kualitas rendah OK
  { src: 'maskot1.png',  quality: 80, width: 300  },
  { src: 'maskot2.png',  quality: 80, width: 300  },
];

for (const item of imagesToConvert) {
  const srcPath  = join(IMG_DIR, item.src);
  const destName = item.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const destPath = join(IMG_DIR, 'webp', destName);

  try {
    const srcBefore = readFileSync(srcPath).length;

    let pipeline = sharp(srcPath);
    if (item.width) {
      pipeline = pipeline.resize({ width: item.width, withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality: item.quality, effort: 5 })
      .toFile(destPath);

    const destAfter = readFileSync(destPath).length;
    const saving = (((srcBefore - destAfter) / srcBefore) * 100).toFixed(1);

    console.log(`✅ ${item.src}`);
    console.log(`   ${(srcBefore / 1024).toFixed(0)} KB  →  ${(destAfter / 1024).toFixed(0)} KB  (hemat ${saving}%)`);
    console.log(`   → webp/${destName}\n`);
  } catch (err) {
    console.error(`❌ Gagal proses ${item.src}:`, err.message);
  }
}

// ─── 2. Favicon Set ───────────────────────────────────────────────────────
const faviconSrc = join(ROOT, 'scripts/favicon-source.png');

if (existsSync(faviconSrc)) {
  console.log('🎨 Generate favicon set...');

  // favicon-32x32.png
  await sharp(faviconSrc)
    .resize(32, 32)
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC_DIR, 'favicon-32x32.png'));
  console.log('   ✅ favicon-32x32.png');

  // apple-touch-icon.png (180x180)
  await sharp(faviconSrc)
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('   ✅ apple-touch-icon.png');

  // favicon-192x192.png (untuk PWA jika diperlukan)
  await sharp(faviconSrc)
    .resize(192, 192)
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC_DIR, 'favicon-192x192.png'));
  console.log('   ✅ favicon-192x192.png');

  // favicon.ico — buat dari 16x16 dan 32x32 PNG
  // sharp tidak bisa output .ico secara native, 
  // kita simpan sebagai PNG 32x32 dengan nama .ico sebagai workaround.
  // Browser modern menerima PNG-as-ICO.
  await sharp(faviconSrc)
    .resize(32, 32)
    .png()
    .toFile(join(PUBLIC_DIR, 'favicon.ico'));
  console.log('   ✅ favicon.ico (PNG-encoded, accepted by modern browsers)\n');
} else {
  console.log('⚠️  Favicon source tidak ditemukan di scripts/favicon-source.png');
  console.log('   Salin file source 512×512px ke sana lalu jalankan ulang.\n');
}

// ─── 3. OG Image ──────────────────────────────────────────────────────────
const ogSrc = join(ROOT, 'scripts/og-source.png');
const ogDest = join(PUBLIC_DIR, 'og-image.jpg');

if (existsSync(ogSrc)) {
  console.log('📸 Generate OG image...');

  await sharp(ogSrc)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(ogDest);

  const size = readFileSync(ogDest).length;
  console.log(`   ✅ og-image.jpg → ${(size / 1024).toFixed(0)} KB\n`);
} else {
  console.log('⚠️  OG image source tidak ditemukan di scripts/og-source.png\n');
}

console.log('─────────────────────────────────────────────────────────────────');
console.log('✅ Selesai! Update import di Vue files ke versi WebP:');
console.log('   Ganti: import bgHero from "~/assets/img/bg-hero.jpg"');
console.log('   Jadi:  import bgHero from "~/assets/img/webp/bg-hero.webp"');
console.log('─────────────────────────────────────────────────────────────────');
