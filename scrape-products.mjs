import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const BASE = 'https://www.solechem.eu';
const SLUGS_FILE = join(import.meta.dirname, 'product-slugs.txt');
const OUTPUT_FILE = join(import.meta.dirname, 'public/data/products.json');
const PROGRESS_FILE = join(import.meta.dirname, 'scrape-progress.json');
const CONCURRENCY = 15;
const RETRY_LIMIT = 3;
const DELAY_MS = 100;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function decodeHtml(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}

function stripTags(s) {
  return s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseProduct(html, slug) {
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/);
  if (!mainMatch) return null;
  const main = mainMatch[0];

  // Name from h1
  const h1Match = main.match(/<h1[^>]*>(.*?)<\/h1>/s);
  const name = h1Match ? decodeHtml(stripTags(h1Match[1])) : '';

  // CAS, EC, MW from info area before first h2
  const firstH2 = main.indexOf('<h2');
  const preH2 = firstH2 > -1 ? main.substring(0, firstH2) : '';
  const cas = preH2.match(/>CAS<[\s\S]*?>(\d[\d-]+\d)</)?.[1] || slug.match(/cas-([\d-]+)/)?.[1] || '';
  const ec = preH2.match(/>EC<[\s\S]*?>(\d[\d-]+\d)</)?.[1] || '';
  const mw = preH2.match(/>Mol\.\s*Weight<[\s\S]*?>([\d.]+)/)?.[1] || '';

  // Category from JSON-LD or links
  const jsonLds = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  let category = '';
  for (const jl of jsonLds) {
    try {
      const data = JSON.parse(jl[1]);
      if (data['@type'] === 'Product' && data.category) {
        category = data.category;
        break;
      }
    } catch {}
  }
  if (!category) {
    const catMatch = main.match(/<a[^>]*href="\/categories\/[^"]+?"[^>]*>(.*?)<\/a>/s);
    if (catMatch) category = decodeHtml(stripTags(catMatch[1]));
  }

  // Industries from links
  const indMatches = [...main.matchAll(/<a[^>]*href="\/industries\/[^"]+?"[^>]*>(.*?)<\/a>/gs)];
  const industries = [...new Set(indMatches.map(m => decodeHtml(stripTags(m[1]))))];

  // Parse sections by h2
  const h2s = [...main.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs)];
  const sectionMap = {};
  for (let i = 0; i < h2s.length; i++) {
    const title = decodeHtml(stripTags(h2s[i][1]));
    const start = h2s[i].index + h2s[i][0].length;
    const end = i + 1 < h2s.length ? h2s[i + 1].index : main.length;
    sectionMap[title] = main.substring(start, end);
  }

  // Description - extract paragraphs
  let description = '';
  const descKey = Object.keys(sectionMap).find(k => k.toLowerCase() === 'description');
  if (descKey) {
    const paras = [...sectionMap[descKey].matchAll(/<p[^>]*>(.*?)<\/p>/gs)];
    description = paras.map(p => decodeHtml(stripTags(p[1]))).filter(t => t).join('\n\n');
  }

  // Physical Properties - extract table rows
  let physicalProperties = {};
  const physKey = Object.keys(sectionMap).find(k => k.toLowerCase().includes('physical'));
  if (physKey) {
    const rows = [...sectionMap[physKey].matchAll(/<tr[^>]*>(.*?)<\/tr>/gs)];
    for (const r of rows) {
      const cells = [...r[1].matchAll(/<t[dh][^>]*>(.*?)<\/t[dh]>/gs)];
      if (cells.length >= 2) {
        const key = decodeHtml(stripTags(cells[0][1]));
        const val = decodeHtml(stripTags(cells[1][1]));
        if (key && val) physicalProperties[key] = val;
      }
    }
  }

  // Safety & Handling
  let safetyHandling = '';
  const safeKey = Object.keys(sectionMap).find(k => k.toLowerCase().includes('safety'));
  if (safeKey) {
    safetyHandling = decodeHtml(stripTags(sectionMap[safeKey]));
  }

  // Trade & Regulatory
  let tradeRegulatory = {};
  const tradeKey = Object.keys(sectionMap).find(k => k.toLowerCase().includes('trade') || k.toLowerCase().includes('regulatory'));
  if (tradeKey) {
    const rows = [...sectionMap[tradeKey].matchAll(/<tr[^>]*>(.*?)<\/tr>/gs)];
    for (const r of rows) {
      const cells = [...r[1].matchAll(/<t[dh][^>]*>(.*?)<\/t[dh]>/gs)];
      if (cells.length >= 2) {
        const key = decodeHtml(stripTags(cells[0][1]));
        const val = decodeHtml(stripTags(cells[1][1]));
        if (key && val) tradeRegulatory[key] = val;
      }
    }
  }

  // Documentation
  let documentation = [];
  const docKey = Object.keys(sectionMap).find(k => k.toLowerCase().includes('documentation'));
  if (docKey) {
    const links = [...sectionMap[docKey].matchAll(/<a[^>]*>(.*?)<\/a>/gs)];
    documentation = links.map(l => decodeHtml(stripTags(l[1]))).filter(t => t && !t.includes('Request'));
    if (documentation.length === 0) {
      const text = decodeHtml(stripTags(sectionMap[docKey]));
      const docs = text.match(/(Technical Data Sheet|Safety Data Sheet|Certificate of Analysis)/g);
      if (docs) documentation = [...new Set(docs)];
    }
  }

  // Other Names
  let otherNames = [];
  const onKey = Object.keys(sectionMap).find(k => k.toLowerCase().includes('other names'));
  if (onKey) {
    const text = decodeHtml(stripTags(sectionMap[onKey])).trim();
    if (text) {
      otherNames = text.split(/[,;]/).map(s => s.trim()).filter(Boolean);
      if (otherNames.length === 1 && otherNames[0].length > 100) {
        otherNames = [text];
      }
    }
  }

  // Related Products
  let relatedProducts = [];
  const rpKey = Object.keys(sectionMap).find(k => k.toLowerCase().includes('related'));
  if (rpKey) {
    const prodLinks = [...sectionMap[rpKey].matchAll(/<a[^>]*href="\/products\/(cas-[\d-]+)\/?\"[^>]*>(.*?)<\/a>/gs)];
    relatedProducts = prodLinks.map(m => ({
      cas: m[1].replace('cas-', ''),
      name: decodeHtml(stripTags(m[2])).replace(/\s*CAS:.*$/, '').trim()
    }));
    const seen = new Set();
    relatedProducts = relatedProducts.filter(p => {
      if (seen.has(p.cas)) return false;
      seen.add(p.cas);
      return true;
    });
  }

  return {
    name,
    cas,
    ec,
    molWeight: mw,
    category,
    industry: industries,
    description,
    physicalProperties: Object.keys(physicalProperties).length > 0 ? physicalProperties : null,
    safetyHandling: safetyHandling || null,
    tradeRegulatory: Object.keys(tradeRegulatory).length > 0 ? tradeRegulatory : null,
    documentation: documentation.length > 0 ? documentation : null,
    otherNames: otherNames.length > 0 ? otherNames : null,
    relatedProducts: relatedProducts.length > 0 ? relatedProducts : null
  };
}

async function fetchWithRetry(url, retries = RETRY_LIMIT) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'SoleChemScraper/1.0' },
        signal: AbortSignal.timeout(30000)
      });
      if (res.ok) return await res.text();
      if (res.status === 429) {
        await sleep(5000 * (attempt + 1));
        continue;
      }
      if (res.status >= 500) {
        await sleep(2000 * (attempt + 1));
        continue;
      }
      return null;
    } catch (e) {
      if (attempt < retries - 1) await sleep(2000 * (attempt + 1));
      else return null;
    }
  }
  return null;
}

async function main() {
  const slugs = readFileSync(SLUGS_FILE, 'utf8').trim().split('\n').filter(Boolean);
  console.log(`Total slugs: ${slugs.length}`);

  let products = [];
  let completed = new Set();
  let failed = [];

  if (existsSync(PROGRESS_FILE)) {
    const progress = JSON.parse(readFileSync(PROGRESS_FILE, 'utf8'));
    products = progress.products || [];
    completed = new Set(progress.completed || []);
    failed = progress.failed || [];
    console.log(`Resuming: ${completed.size} already done, ${products.length} products saved`);
  }

  const remaining = slugs.filter(s => !completed.has(s));
  console.log(`Remaining: ${remaining.length}`);

  let processedSinceLastSave = 0;
  const SAVE_EVERY = 100;

  function saveProgress() {
    writeFileSync(PROGRESS_FILE, JSON.stringify({
      products,
      completed: [...completed],
      failed
    }));
    const output = products.map((p, i) => ({ id: i + 1, ...p }));
    writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
    console.log(`  Saved ${products.length} products to disk`);
  }

  for (let i = 0; i < remaining.length; i += CONCURRENCY) {
    const batch = remaining.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(async (slug) => {
      const url = `${BASE}${slug}`;
      const html = await fetchWithRetry(url);
      if (!html) return { slug, product: null };
      const product = parseProduct(html, slug);
      return { slug, product };
    }));

    for (const { slug, product } of results) {
      completed.add(slug);
      if (product && product.name) {
        products.push(product);
      } else {
        failed.push(slug);
      }
      processedSinceLastSave++;
    }

    const total = completed.size;
    const pct = ((total / slugs.length) * 100).toFixed(1);
    process.stdout.write(`\r  Progress: ${total}/${slugs.length} (${pct}%) | Products: ${products.length} | Failed: ${failed.length}`);

    if (processedSinceLastSave >= SAVE_EVERY) {
      saveProgress();
      processedSinceLastSave = 0;
    }

    if (i + CONCURRENCY < remaining.length) await sleep(DELAY_MS);
  }

  saveProgress();
  console.log(`\n\nDone! ${products.length} products scraped, ${failed.length} failed.`);
  if (failed.length > 0) {
    writeFileSync(join(import.meta.dirname, 'scrape-failed.txt'), failed.join('\n'));
    console.log('Failed slugs saved to scrape-failed.txt');
  }
}

main().catch(console.error);
