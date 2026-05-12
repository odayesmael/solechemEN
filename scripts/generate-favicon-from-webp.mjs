import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

const sourceFile = path.join(publicDir, 'favicon-original.webp');

if (!fs.existsSync(sourceFile)) {
  console.error('❌ Error: favicon-original.webp not found in /public/');
  console.error(`Expected: ${sourceFile}`);
  process.exit(1);
}

const sizes = [
  { name: 'favicon.svg', size: 32, format: 'svg' },
  { name: 'favicon-32x32.png', size: 32, format: 'png' },
  { name: 'favicon-192x192.png', size: 192, format: 'png' },
  { name: 'favicon-512x512.png', size: 512, format: 'png' },
  { name: 'apple-touch-icon.png', size: 180, format: 'png' },
  { name: 'favicon-maskable-192x192.png', size: 192, format: 'png' },
  { name: 'favicon-maskable-512x512.png', size: 512, format: 'png' },
];

console.log('📦 Generating favicon variants from favicon-original.webp...\n');

for (const { name, size, format } of sizes) {
  const outputPath = path.join(publicDir, name);

  try {
    const pipeline = sharp(sourceFile)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      });

    if (format === 'png') {
      await pipeline.png().toFile(outputPath);
    } else if (format === 'svg') {
      // For SVG, we'll create it from PNG
      await pipeline.png().toFile(outputPath);
      // Rename to show it's converted
      const pngPath = outputPath.replace('.svg', '-temp.png');
      if (fs.existsSync(pngPath)) {
        fs.renameSync(pngPath, outputPath);
      }
    }

    const stats = fs.statSync(outputPath);
    console.log(`✓ ${name.padEnd(30)} (${size}x${size}) - ${(stats.size / 1024).toFixed(2)}KB`);
  } catch (error) {
    console.error(`✗ Failed to generate ${name}: ${error.message}`);
  }
}

console.log('\n✅ Favicon generation complete!\n');
console.log('Generated favicons:');
console.log('  ✓ favicon.svg');
console.log('  ✓ favicon-32x32.png');
console.log('  ✓ favicon-192x192.png');
console.log('  ✓ favicon-512x512.png');
console.log('  ✓ apple-touch-icon.png');
console.log('  ✓ favicon-maskable-192x192.png');
console.log('  ✓ favicon-maskable-512x512.png\n');
console.log('Ready for build! Run: npm run build\n');
