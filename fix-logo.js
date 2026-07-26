const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';
const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Replace <img ... class="logo" /> with <a href="index.html"><img ... class="logo" /></a>
  // We need to be careful if it's already wrapped.
  if (!html.includes('<a href="index.html">\n      <img')) {
    html = html.replace(
      /<img src="resource\/Cameo%20image\/Logo%20Cameo\.png" alt="Cameo Thailand Logo" class="logo" \/>/,
      '<a href="index.html">\n      <img src="resource/Cameo%20image/Logo%20Cameo.png" alt="Cameo Thailand Logo" class="logo" />\n    </a>'
    );
    fs.writeFileSync(filePath, html);
    console.log(`Updated ${file}`);
  }
});

console.log('Logo links fixed.');
