const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';
const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

const newFooter = `  <footer class="footer">
    <div class="footer-links" style="margin-bottom: 1rem; display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
      <a href="https://www.facebook.com/cameoprofessional/" target="_blank" rel="noopener noreferrer" style="color: #6C5A4F; text-decoration: none; font-weight: 600;">📘 Facebook</a>
      <a href="https://www.tiktok.com/@cameo.thailand" target="_blank" rel="noopener noreferrer" style="color: #6C5A4F; text-decoration: none; font-weight: 600;">🎵 TikTok</a>
      <a href="https://shopee.co.th/salonplus" target="_blank" rel="noopener noreferrer" style="color: #ee4d2d; text-decoration: none; font-weight: 600;">🛒 Shopee</a>
    </div>
    <p>© 2026 Cameo Thailand. All rights reserved.</p>
  </footer>`;

const oldFooterRegex = /<footer class="footer">[\s\S]*?<\/footer>/;

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  if (html.match(oldFooterRegex)) {
    html = html.replace(oldFooterRegex, newFooter);
    fs.writeFileSync(filePath, html);
    console.log(`Updated footer in ${file}`);
  }
});
