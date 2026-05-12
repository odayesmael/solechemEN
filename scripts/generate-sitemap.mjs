import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Read metadata and products
const metadata = JSON.parse(fs.readFileSync(path.join(rootDir, 'public/data/metadata.json'), 'utf8'));
const productsData = JSON.parse(fs.readFileSync(path.join(rootDir, 'public/data/products.json'), 'utf8'));

const baseUrl = 'https://solechem.com';
const staticPages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/catalog', changefreq: 'weekly', priority: 0.9 },
  { url: '/categories', changefreq: 'monthly', priority: 0.8 },
  { url: '/industries', changefreq: 'monthly', priority: 0.8 },
  { url: '/manufacturing', changefreq: 'monthly', priority: 0.7 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/sustainability', changefreq: 'monthly', priority: 0.6 },
  { url: '/privacy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms', changefreq: 'yearly', priority: 0.3 },
  { url: '/cookies', changefreq: 'yearly', priority: 0.3 },
];

const categoryPages = metadata.categories.map(cat => ({
  url: `/categories?category=${encodeURIComponent(cat)}`,
  changefreq: 'monthly',
  priority: 0.7,
}));

const industryPages = metadata.industries.map(ind => ({
  url: `/industries?industry=${encodeURIComponent(ind)}`,
  changefreq: 'monthly',
  priority: 0.7,
}));

function generateSitemap(pages) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

function generateProductSitemap(products) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  products.slice(0, 5000).forEach(product => {
    if (product.slug) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/products/${product.slug}</loc>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    }
  });

  xml += '</urlset>';
  return xml;
}

// Generate main sitemap
const mainPages = [...staticPages, ...categoryPages, ...industryPages];
const mainSitemap = generateSitemap(mainPages);
fs.writeFileSync(path.join(rootDir, 'public/sitemap.xml'), mainSitemap);
console.log(`✓ Generated sitemap.xml with ${mainPages.length} URLs`);

// Generate products sitemap
const products = Array.isArray(productsData) ? productsData : productsData.products || [];
const productSitemap = generateProductSitemap(products);
fs.writeFileSync(path.join(rootDir, 'public/sitemap-products.xml'), productSitemap);
console.log(`✓ Generated sitemap-products.xml with ${Math.min(5000, products.length)} product URLs`);

// Generate sitemap index
let sitemapIndex = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemapIndex += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
sitemapIndex += `  <sitemap><loc>${baseUrl}/sitemap.xml</loc></sitemap>\n`;
sitemapIndex += `  <sitemap><loc>${baseUrl}/sitemap-products.xml</loc></sitemap>\n`;
sitemapIndex += '</sitemapindex>';
fs.writeFileSync(path.join(rootDir, 'public/sitemap-index.xml'), sitemapIndex);
console.log('✓ Generated sitemap-index.xml');
