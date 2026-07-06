const fs = require('fs');
const path = require('path');

function sanitize(name) {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // supprimer accents
    .replace(/[\[\]\(\),{}]/g, "")                    // supprimer caractères spéciaux
    .replace(/\s+/g, "-")                             // espaces → tirets
    .replace(/-+/g, "-")                              // tirets multiples → un seul
    .replace(/^-|-$/g, "");                           // nettoyer début/fin
}

const projectsPath = path.join(__dirname, '../src/data/projects.ts');
let content = fs.readFileSync(projectsPath, 'utf8');

// Replace all paths matching /foldername/filename.ext
content = content.replace(/"(\/[^/]+)\/([^"]+)"/g, (match, folder, filename) => {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const newName = sanitize(base) + ext.toLowerCase();
  return `"${folder}/${newName}"`;
});

fs.writeFileSync(projectsPath, content);
console.log('projects.ts updated');
