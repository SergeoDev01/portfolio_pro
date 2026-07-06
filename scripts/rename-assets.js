const fs = require("fs");
const path = require("path");

function sanitize(name) {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // supprimer accents
    .replace(/[\[\]\(\),{}]/g, "")                    // supprimer caractères spéciaux
    .replace(/\s+/g, "-")                             // espaces → tirets
    .replace(/-+/g, "-")                              // tirets multiples → un seul
    .replace(/^-|-$/g, "");                           // nettoyer début/fin
}

function renameDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const items = fs.readdirSync(dirPath);
  items.forEach((item) => {
    const oldPath = path.join(dirPath, item);
    const ext = path.extname(item);
    const base = path.basename(item, ext);
    const newName = sanitize(base) + ext.toLowerCase();
    const newPath = path.join(dirPath, newName);
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
      console.log(`✓ ${item} → ${newName}`);
    }
  });
}

// Lancer sur tous les dossiers de projets
[
  "./public/bingoobank",
  "./public/logo_aeron",
  "./public/qda",
  "./public/skin_care_shooting",
  "./public/parle_g_shooting_projet",
  "./public/logo_bingoo_bank",
  "./public/ai_shooting_pro",
  "./public/video_pub",
].forEach(renameDir);

console.log("✅ Renommage terminé");
