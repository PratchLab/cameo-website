const fs = require('fs');
const filePath = '/Users/pratch/Downloads/Project/Cameo Website/category-1.html';
let html = fs.readFileSync(filePath, 'utf8');

// List of tall brushes that need to be rotated to lay flat
const verticalCodes = [
  'B101', 'B102', 'B103', 'B104', 'B105', 'B106', 'B107',
  'RM120', 'RM180', 'RM280', 'RM380', 'RM480', 'RM880'
];

// Remove any existing rotate-vertical classes just in case
html = html.replace(/class="rotate-vertical"\s*/g, '');

verticalCodes.forEach(code => {
    const regex = new RegExp(`(<img\\s+src="[^"]+"\\s+alt="[^"]+"\\s+loading="lazy"\\s*\\/>)(\\s*<\\/div>\\s*<div class="product-details">\\s*<div class="product-code">${code}<\\/div>)`, 'g');
    html = html.replace(regex, (match, p1, p2) => {
        return p1.replace('<img ', '<img class="rotate-vertical" ') + p2;
    });
});

fs.writeFileSync(filePath, html);
console.log('Added rotation classes to specific vertical brushes.');
