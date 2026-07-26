const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';
const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Create a regex to match the entire nav section
  const navPattern = /<nav class="nav">[\s\S]*?<\/nav>/;
  
  // Extract the original nav to find which link has the class "active"
  const match = html.match(navPattern);
  if (match) {
    let originalNav = match[0];
    
    // Check active states
    const isActive = (href) => originalNav.includes(`href="${href}" class="active"`) ? ' class="active"' : '';
    
    const newNav = `<nav class="nav">
    <ul class="nav-row top-row">
      <li><a href="index.html"${isActive('index.html')}>หน้าหลัก</a></li>
      <li><a href="about.html"${isActive('about.html')}>เกี่ยวกับเรา</a></li>
      <li><a href="buying-guide.html"${isActive('buying-guide.html')}>คู่มือเลือกซื้อ</a></li>
      <li><a href="faq.html"${isActive('faq.html')}>FAQ</a></li>
    </ul>
    <ul class="nav-row bottom-row">
      <li><a href="category-1.html"${isActive('category-1.html')}>แปรงไดร์</a></li>
      <li><a href="category-2.html"${isActive('category-2.html')}>แปรงเกล้า</a></li>
      <li><a href="category-3.html"${isActive('category-3.html')}>หวีอีโต้</a></li>
      <li><a href="category-4.html"${isActive('category-4.html')}>หวีซอย</a></li>
      <li><a href="category-5.html"${isActive('category-5.html')}>หวีหางหนู</a></li>
      <li><a href="category-6.html"${isActive('category-6.html')}>อุปกรณ์ย้อมผม</a></li>
      <li><a href="category-7.html"${isActive('category-7.html')}>แปรงขัดเล็บ</a></li>
    </ul>
  </nav>`;

    html = html.replace(navPattern, newNav);
    fs.writeFileSync(filePath, html);
    console.log(`Updated ${file}`);
  }
});

// Update CSS
const cssPath = path.join(projectDir, 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace old #main-nav CSS with new .nav-row CSS
if (!css.includes('.nav-row')) {
  css = css.replace(
    /#main-nav {\s*list-style: none;\s*display: flex;\s*justify-content: center;\s*flex-wrap: wrap;\s*gap: 2rem;\s*}/g,
    `.nav-row {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 0.5rem;
}
.nav-row.bottom-row {
  margin-bottom: 0;
  gap: 1.5rem;
}
.nav-row.bottom-row a {
  font-size: 0.95rem;
  color: #6C5A4F;
}`
  );
  fs.writeFileSync(cssPath, css);
}

console.log('Navigation rows fixed.');
