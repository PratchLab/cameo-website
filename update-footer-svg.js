const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';
const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

const fbSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`;
const ttSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>`;
const shopeeSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`;

const newFooter = `  <footer class="footer">
    <div class="footer-links" style="margin-bottom: 1rem; display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; align-items: center;">
      <a href="https://www.facebook.com/cameoprofessional/" target="_blank" rel="noopener noreferrer" style="color: #6C5A4F; text-decoration: none; font-weight: 600; display: flex; align-items: center;">
        ${fbSvg} Facebook
      </a>
      <a href="https://www.tiktok.com/@cameo.thailand" target="_blank" rel="noopener noreferrer" style="color: #6C5A4F; text-decoration: none; font-weight: 600; display: flex; align-items: center;">
        ${ttSvg} TikTok
      </a>
      <a href="https://shopee.co.th/salonplus" target="_blank" rel="noopener noreferrer" style="color: #ee4d2d; text-decoration: none; font-weight: 600; display: flex; align-items: center;">
        ${shopeeSvg} Shopee
      </a>
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
    console.log(`Updated footer SVGs in ${file}`);
  }
});
