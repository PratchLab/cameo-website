const fs = require('fs');

// Fix category-4.html (VC816.)
let cat4 = fs.readFileSync('category-4.html', 'utf8');
const vc816Path = encodeURI('resource/Cameo image/4 หวีซอย หวีสาง/VC816.jpg');
cat4 = cat4.replace(
  /<img src="https:\/\/via\.placeholder\.com\/400x400\?text=No\+Image" alt="หวีสางยักษ์ยาว".*?\/>\s*<\/div>\s*<div class="product-details">\s*<div class="product-code">VC816\.<\/div>/s,
  `<img src="${vc816Path}" alt="หวีสางยักษ์ยาว" loading="lazy" />\n        </div>\n        <div class="product-details">\n          <div class="product-code">VC816</div>`
);
fs.writeFileSync('category-4.html', cat4);

// Fix category-5.html (STC01-2., STC01-3., STC01-8.)
let cat5 = fs.readFileSync('category-5.html', 'utf8');
const stc2Path = encodeURI('resource/Cameo image/5 หวีหางหนู หวียี/STC01-2.jpg');
const stc3Path = encodeURI('resource/Cameo image/5 หวีหางหนู หวียี/STC01-3.jpg');
const stc8Path = encodeURI('resource/Cameo image/5 หวีหางหนู หวียี/STC01-8.jpg');

cat5 = cat5.replace(
  /<img src="https:\/\/via\.placeholder\.com\/400x400\?text=No\+Image" alt="หวีส้อมพลาสติกสีดำ".*?\/>\s*<\/div>\s*<div class="product-details">\s*<div class="product-code">STC01-2\.<\/div>/s,
  `<img src="${stc2Path}" alt="หวีส้อมพลาสติกสีดำ" loading="lazy" />\n        </div>\n        <div class="product-details">\n          <div class="product-code">STC01-2</div>`
);

cat5 = cat5.replace(
  /<img src="https:\/\/via\.placeholder\.com\/400x400\?text=No\+Image" alt="หวีส้อมหางเหล็กพลาสติกสีดำ".*?\/>\s*<\/div>\s*<div class="product-details">\s*<div class="product-code">STC01-3\.<\/div>/s,
  `<img src="${stc3Path}" alt="หวีส้อมหางเหล็กพลาสติกสีดำ" loading="lazy" />\n        </div>\n        <div class="product-details">\n          <div class="product-code">STC01-3</div>`
);

cat5 = cat5.replace(
  /<img src="https:\/\/via\.placeholder\.com\/400x400\?text=No\+Image" alt="หวีหางหนูซี่ถี่พลาสติกสีดำ".*?\/>\s*<\/div>\s*<div class="product-details">\s*<div class="product-code">STC01-8\.<\/div>/s,
  `<img src="${stc8Path}" alt="หวีหางหนูซี่ถี่พลาสติกสีดำ" loading="lazy" />\n        </div>\n        <div class="product-details">\n          <div class="product-code">STC01-8</div>`
);
fs.writeFileSync('category-5.html', cat5);
console.log('Fixed dots');
