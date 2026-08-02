import sharp from "sharp";
import path from "path";
import fs from "fs";

const sourceDir = path.join(process.cwd(), "public", "projet_web");

const files = [
  "bingoobank_landing_page.png",
  "fontdrop_saas_landing_page.png",
  "startuperio_landing_page.png",
  "page_de_vente_trading.png",
];

async function main() {
  for (const file of files) {
    const src = path.join(sourceDir, file);
    const outName = file.replace(/\.png$/, ".webp");
    const out = path.join(sourceDir, outName);

    const meta = await sharp(src).metadata();
    const maxWidth = 1280;
    const width =
      meta.width && meta.width > maxWidth ? maxWidth : meta.width;

    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);

    const outMeta = await sharp(out).metadata();
    const sizeKB = Math.round(fs.statSync(out).size / 1024);
    console.log(
      `${file} (${meta.width}x${meta.height}) -> ${outName} (${outMeta.width}x${outMeta.height}) ${sizeKB} KB`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
