const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';
const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

const faviconTag = '\n  <link rel="icon" type="image/png" href="favicon.png" />';

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  if (!html.includes('href="favicon.png"')) {
    // Insert just before </head>
    html = html.replace('</head>', faviconTag + '\n</head>');
    fs.writeFileSync(filePath, html);
    console.log(`Added favicon to ${file}`);
  }
});
