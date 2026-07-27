const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';
const files = fs.readdirSync(projectDir).filter(f => f.startsWith('category-') && f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Extract all products in this category
  // <div class="product-code">SKU</div>
  // <h3 class="product-name">Name</h3>
  // <div class="product-price">Price</div>
  // Also need the image URL: <img src="..." alt="..." />
  // We can use regex to find all product cards.
  
  const cardRegex = /<div class="product-card">[\s\S]*?<img src="([^"]+)"[^>]*>[\s\S]*?<div class="product-code">([^<]+)<\/div>\s*<h3 class="product-name">([^<]+)<\/h3>[\s\S]*?<div class="product-price">([\d\.]+)<\/div>/g;
  
  let match;
  const products = [];
  
  while ((match = cardRegex.exec(html)) !== null) {
    const imgSrc = match[1];
    const sku = match[2].trim();
    const name = match[3].trim();
    const price = match[4].trim();
    
    // Construct schema for this product
    products.push({
      "@type": "Product",
      "name": name,
      "image": `https://cameothailand.com/${imgSrc.replace(/ /g, '%20')}`,
      "sku": sku,
      "brand": {
        "@type": "Brand",
        "name": "Cameo"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://cameothailand.com/${file}`,
        "priceCurrency": "THB",
        "price": price,
        "availability": "https://schema.org/InStock"
      }
    });
  }
  
  if (products.length > 0) {
    const schemaObj = {
      "@context": "https://schema.org",
      "@graph": products
    };
    
    const schemaScript = `\n  <!-- AI SEO: Product Schema Markup -->\n  <script type="application/ld+json">\n  ${JSON.stringify(schemaObj, null, 2)}\n  </script>\n</body>`;
    
    // Remove old schema if exists to prevent duplicates
    html = html.replace(/<!-- AI SEO: Product Schema Markup -->[\s\S]*?<\/script>\s*/, '');
    
    html = html.replace('</body>', schemaScript);
    fs.writeFileSync(filePath, html);
    console.log(`Injected Product Schema into ${file}`);
  }
});
