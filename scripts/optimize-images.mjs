import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, parse, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = join(fileURLToPath(import.meta.url), '..');
const ROOT = join(__dirname, '..');

const QUALITY = 80;
const MAX_WIDTH = 1200;

const dirs = [
  'src/assets',
  'src/assets/projects',
  'src/assets/tech',
  'src/assets/company',
  'src/assets/tech-stack',
  'public',
  'public/desktop_pc/textures',
  'public/planet/textures',
];

const isImage = (f) => /\.(png|jpe?g)$/i.test(f);

async function convert(filePath) {
  const parsed = parse(filePath);
  // Only convert PNG/JPEG over 20KB
  const size = statSync(filePath).size;
  if (size < 20 * 1024) return;

  const outPath = join(parsed.dir, parsed.name + '.webp');

  let pipeline = sharp(filePath);
  const meta = await pipeline.metadata();

  // Resize if wider than MAX_WIDTH
  if (meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outPath);

  const oldKb = (size / 1024).toFixed(1);
  const newSize = statSync(outPath).size;
  const newKb = (newSize / 1024).toFixed(1);
  const saved = ((1 - newSize / size) * 100).toFixed(0);
  console.log(`${parsed.base} → ${parsed.name}.webp  (${oldKb}KB → ${newKb}KB, -${saved}%)`);
}

async function main() {
  for (const dir of dirs) {
    const fullDir = join(ROOT, dir);
    if (!existsSync(fullDir)) {
      console.log(`Skipping ${dir} — not found`);
      continue;
    }
    const files = readdirSync(fullDir).filter(isImage);
    for (const file of files) {
      await convert(join(fullDir, file));
    }
  }
  console.log('\nDone! Now update import paths in source files to use .webp extensions.');
}

main().catch(console.error);
