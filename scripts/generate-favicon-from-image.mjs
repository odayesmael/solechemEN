import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

const sourceFile = path.join(publicDir, 'favicon-original.png');

if (!fs.existsSync(sourceFile)) {
  console.error('❌ Error: favicon-original.png not found in /public/');
  console.error(`Expected: ${sourceFile}`);
  process.exit(1);
}

const sizes = [
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'favicon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-maskable-192x192.png', size: 192 },
  { name: 'favicon-maskable-512x512.png', size: 512 },
  { name: 'favicon.ico', size: 32 }, // For backward compatibility
];

console.log('📦 Generating favicon variants from favicon-original.png...\n');

for (const { name, size } of sizes) {
  const outputPath = path.join(publicDir, name);

  try {
    await sharp(sourceFile)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✓ ${name.padEnd(30)} (${size}x${size}) - ${(stats.size / 1024).toFixed(2)}KB`);
  } catch (error) {
    console.error(`✗ Failed to generate ${name}: ${error.message}`);
  }
}

// Also create a backup SVG from the image (optional)
try {
  const stats = fs.statSync(path.join(publicDir, 'favicon.svg'));
  console.log(`\n✓ favicon.svg exists (${(stats.size / 1024).toFixed(2)}KB)`);
} catch {
  console.log('\n⚠ Note: favicon.svg not found, keeping PNG-based favicon');
}

console.log('\n✅ Favicon generation complete!\n');
console.log('Updated favicons in /public/:');
console.log('  ✓ favicon-32x32.png');
console.log('  ✓ favicon-192x192.png');
console.log('  ✓ favicon-512x512.png');
console.log('  ✓ apple-touch-icon.png');
console.log('  ✓ favicon-maskable-192x192.png');
console.log('  ✓ favicon-maskable-512x512.png\n');
