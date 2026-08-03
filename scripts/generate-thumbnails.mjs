#!/usr/bin/env node
/**
 * scripts/generate-thumbnails.mjs
 *
 * Extrait la première frame (à t=1s) de chaque vidéo dans /public/video_pub/
 * et la sauvegarde en WEBP dans /public/thumbnails/.
 *
 * Usage : node scripts/generate-thumbnails.mjs
 * Requis : ffmpeg installé et accessible dans le PATH
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const VIDEO_DIR = join(ROOT, "public", "video_pub");
const THUMB_DIR = join(ROOT, "public", "thumbnails");

// Créer le dossier thumbnails s'il n'existe pas
if (!existsSync(THUMB_DIR)) {
  mkdirSync(THUMB_DIR, { recursive: true });
  console.log("📁 Dossier /public/thumbnails/ créé.");
}

const videos = readdirSync(VIDEO_DIR).filter((f) =>
  [".mp4", ".mov", ".webm"].includes(extname(f).toLowerCase())
);

if (videos.length === 0) {
  console.log("Aucune vidéo trouvée dans /public/video_pub/");
  process.exit(0);
}

console.log(`🎬 ${videos.length} vidéo(s) trouvée(s)\n`);

for (const file of videos) {
  const name = basename(file, extname(file));
  const inputPath = join(VIDEO_DIR, file);
  const outputPath = join(THUMB_DIR, `${name}.webp`);

  if (existsSync(outputPath)) {
    console.log(`✅ ${name}.webp — déjà existant, ignoré.`);
    continue;
  }

  try {
    // Extraire la frame à t=1s, redimensionner à 800px de large, qualité 85
    execSync(
      `ffmpeg -ss 1 -i "${inputPath}" -vframes 1 -vf "scale=800:-1" -q:v 85 -y "${outputPath}"`,
      { stdio: "pipe" }
    );
    console.log(`✅ ${name}.webp — généré avec succès.`);
  } catch (err) {
    console.error(`❌ ${name} — erreur :`, err.message || err);
  }
}

console.log("\n🎉 Terminé ! Les vignettes sont dans /public/thumbnails/");
console.log("👉 Mettez à jour projects.ts pour ajouter thumbnail: \"/thumbnails/nom.webp\"");
