import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

const sizes = [
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'favicon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-maskable-192x192.png', size: 192 },
  { name: 'favicon-maskable-512x512.png', size: 512 },
];

const svgFile = path.join(publicDir, 'favicon.svg');

console.log('📦 Generating favicon variants...');

for (const { name, size } of sizes) {
  const outputPath = path.join(publicDir, name);

  try {
    await sharp(svgFile)
      .resize(size, size, { fit: 'contain', background: 'transparent' })
      .png()
      .toFile(outputPath);

    console.log(`✓ ${name} (${size}x${size})`);
  } catch (error) {
    console.error(`✗ Failed to generate ${name}: ${error.message}`);
  }
}

console.log('✅ All favicons generated!');
