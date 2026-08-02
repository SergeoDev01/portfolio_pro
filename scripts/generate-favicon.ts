import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = path.join(process.cwd(), 'public', 'avatar.png');
const outputDir = path.join(process.cwd(), 'src', 'app');

// SVG mask with rounded corners (6px radius for 32x32 = ~18% corner radius)
const roundedMaskSvg = `
<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" ry="6" fill="white"/>
</svg>
`;

async function generateFavicon() {
  try {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.error('Avatar file not found:', inputPath);
      process.exit(1);
    }

    // Create the rounded mask buffer
    const maskBuffer = Buffer.from(roundedMaskSvg);

    // Read and resize the image first
    const resizedImage = await sharp(inputPath)
      .resize(32, 32, { 
        fit: 'cover',
        position: 'center'
      })
      .toBuffer();

    // Apply the rounded corners mask using composite
    const faviconBuffer = await sharp(resizedImage)
      .composite([
        {
          input: maskBuffer,
          blend: 'dest-in'
        }
      ])
      .png()
      .toBuffer();

    // Write the favicon to src/app/favicon.ico
    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), faviconBuffer);
    
    console.log('✓ Favicon generated successfully (32x32 with rounded corners from avatar.png)');
    console.log('  Output:', path.join(outputDir, 'favicon.ico'));
    
  } catch (error) {
    console.error('Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon();
