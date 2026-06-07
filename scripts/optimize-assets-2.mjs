/**
 * optimize-assets-2.mjs
 * Konversi gambar yang belum dikonversi ke WebP:
 * - instagram.png (60KB) → webp
 * - facebook.png (15KB) → webp
 * - tiktok.png (25KB) → webp
 * - logo.png (34KB) → webp (untuk hero eager load)
 * - Rectangle 17.png (143KB) → webp (jika digunakan)
 * - disini-tag.png (24KB) → webp
 * - bg-button1.png (7KB) → webp
 */

import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IMG_DIR = join(ROOT, 'app/assets/img');
const WEBP_DIR = join(IMG_DIR, 'webp');

console.log('🚀 Optimasi tahap 2 — konversi sisa gambar ke WebP...\n');

const images = [
  { src: 'instagram.png',   quality: 90, width: 90  },
  { src: 'facebook.png',    quality: 90, width: 90  },
  { src: 'tiktok.png',      quality: 90, width: 90  },
  { src: 'logo.png',        quality: 90, width: 600 },
  { src: 'disini-tag.png',  quality: 85, width: 240 },
  { src: 'bg-button1.png',  quality: 85, width: 900 },
  { src: 'qrcode.png',      quality: 90, width: 400 },
];

for (const item of images) {
  const srcPath  = join(IMG_DIR, item.src);
  const destName = item.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const destPath = join(WEBP_DIR, destName);

  if (!existsSync(srcPath)) {
    console.log(`⏭  Skip (tidak ada): ${item.src}`);
    continue;
  }

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

    const indicator = Number(saving) > 0 ? '✅' : '⚠️ ';
    console.log(`${indicator} ${item.src}`);
    console.log(`   ${(srcBefore / 1024).toFixed(0)} KB → ${(destAfter / 1024).toFixed(0)} KB  (${saving}%)\n`);
  } catch (err) {
    console.error(`❌ Gagal: ${item.src}`, err.message);
  }
}

console.log('✅ Selesai! Update import di hero.vue dan maps.vue ke versi WebP baru.');
