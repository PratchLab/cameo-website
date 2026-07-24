const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';
const imagesDir = path.join(projectDir, 'resource', 'Cameo image');

// 1. Gather all images
let imagesMap = {}; // Maps productCode (uppercase, no extension) to relative image path
const categoryFolders = fs.readdirSync(imagesDir).filter(f => fs.statSync(path.join(imagesDir, f)).isDirectory());

categoryFolders.forEach(folder => {
  const folderPath = path.join(imagesDir, folder);
  const files = fs.readdirSync(folderPath);
  files.forEach(file => {
    // Only process images
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      // Extract the product code (e.g. "B101 .jpg" -> "B101")
      const code = file.split('.')[0].trim().toUpperCase();
      // URL encode the path so it works in HTML src
      const relativePath = `resource/Cameo image/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
      imagesMap[code] = relativePath;
    }
  });
});

console.log(`Found ${Object.keys(imagesMap).length} images.`);

// 2. Process each category HTML file (1 to 7)
for (let i = 1; i <= 7; i++) {
  const htmlPath = path.join(projectDir, `category-${i}.html`);
  if (!fs.existsSync(htmlPath)) continue;
  
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Update header logo just in case (we did this in index, but want to make sure it uses local)
  const localLogoPath = `resource/Cameo image/${encodeURIComponent('Logo Cameo.png')}`;
  html = html.replace(/<img src="https:\/\/drive\.google\.com[^"]+"/g, `<img src="${localLogoPath}"`);
  
  // Extract table rows using regex to get product info
  const tableRowRegex = /<tr><td>(\d+|x)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td><\/tr>/g;
  let products = [];
  let match;
  while ((match = tableRowRegex.exec(html)) !== null) {
    products.push({
      code: match[2].trim(),
      name: match[3].trim(),
      price: match[4].trim()
    });
  }
  
  if (products.length === 0) {
    console.log(`No products found in category-${i}.html table, might already be converted.`);
    continue;
  }
  
  // Build the new Grid HTML
  let gridHtml = `\n    <div class="product-grid">\n`;
  products.forEach(p => {
    // Look up image (fallback to a placeholder if missing)
    const upperCode = p.code.toUpperCase();
    const imgSrc = imagesMap[upperCode] || 'https://via.placeholder.com/400x400?text=No+Image';
    
    gridHtml += `      <div class="product-card">
        <div class="product-image-wrapper">
          <img src="${imgSrc}" alt="${p.name}" loading="lazy" />
        </div>
        <div class="product-details">
          <div class="product-code">${p.code}</div>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-price">${p.price}</div>
        </div>
      </div>\n`;
  });
  gridHtml += `    </div>\n  `;
  
  // Replace table with grid
  // Note: we'll just replace the whole table block
  html = html.replace(/<table class="product-table">[\s\S]*?<\/table>/, gridHtml);
  
  fs.writeFileSync(htmlPath, html);
  console.log(`Updated category-${i}.html with ${products.length} products in a grid.`);
}

// 3. Update index.html logo
const indexHtmlPath = path.join(projectDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  const localLogoPath = `resource/Cameo image/${encodeURIComponent('Logo Cameo.png')}`;
  indexHtml = indexHtml.replace(/<img src="https:\/\/drive\.google\.com[^"]+"/g, `<img src="${localLogoPath}"`);
  fs.writeFileSync(indexHtmlPath, indexHtml);
  console.log(`Updated index.html logo path.`);
}

console.log('Build completed successfully.');
