import sharp from "sharp"; 
import fs from "fs/promises"; 
import path from "path"; 
import { projects } from "../src/data/projects.ts"; 

async function getBlurDataURL(imagePath: string) { 
  try { 
    const fullPath = path.join(process.cwd(), "public", imagePath); 
    const buffer = await fs.readFile(fullPath); 
    const resized = await sharp(buffer) 
      .resize(10, 10, { fit: "inside" }) // 10x10px — minuscule 
      .toBuffer(); 
    const base64 = resized.toString("base64"); 
    const mimeType = imagePath.endsWith(".jpg") || imagePath.endsWith(".jpeg") 
      ? "image/jpeg" : "image/png"; 
    return `data:${mimeType};base64,${base64}`; 
  } catch (err) { 
    console.error(`Error processing ${imagePath}:`, err);
    // Fallback couleur palette si image introuvable 
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg=="; 
  } 
} 

async function main() { 
  const result: Record<string, { src: string, blur: string }[]> = {}; 
  for (const project of projects) { 
    result[project.slug] = []; 
    for (const img of project.images) { 
      if (!img) continue; 
      // If img is already an object {src, blur}, handle it
      const imgSrc = typeof img === "string" ? img : (img as any).src;
      const blur = await getBlurDataURL(imgSrc); 
      result[project.slug].push({ src: imgSrc, blur }); 
      console.log(`✓ ${imgSrc}`); 
    } 
  } 
  await fs.writeFile( 
    "src/data/blur-data.json", 
    JSON.stringify(result, null, 2) 
  ); 
  console.log("✅ blur-data.json généré"); 
} 

main(); 
