const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';

const newNav = `<nav class="nav">
    <ul id="main-nav">
      <li><a href="index.html">หน้าหลัก</a></li>
      <li><a href="about.html">เกี่ยวกับเรา</a></li>
      <li><a href="buying-guide.html">คู่มือเลือกซื้อ</a></li>
      <li><a href="faq.html">FAQ</a></li>
      <li><a href="category-1.html">แปรงไดร์</a></li>
      <li><a href="category-2.html">แปรงเกล้า</a></li>
      <li><a href="category-3.html">หวีอีโต้</a></li>
      <li><a href="category-4.html">หวีซอย</a></li>
      <li><a href="category-5.html">หวีหางหนู</a></li>
      <li><a href="category-6.html">อุปกรณ์ย้อมผม</a></li>
      <li><a href="category-7.html">แปรงขัดเล็บ</a></li>
    </ul>
  </nav>`;

// 1. Update index.html
const indexFile = path.join(projectDir, 'index.html');
if (fs.existsSync(indexFile)) {
  let html = fs.readFileSync(indexFile, 'utf8');
  // Update Nav
  html = html.replace(/<nav class="nav">[\s\S]*?<\/nav>/, newNav);
  
  // Inject Organization Schema
  const orgSchema = `\n  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cameo Thailand",
    "url": "https://cameothailand.com",
    "logo": "https://cameothailand.com/resource/Cameo%20image/Logo%20Cameo.png"
  }
  </script>\n</head>`;
  
  if (!html.includes('"@type": "Organization"')) {
    html = html.replace('</head>', orgSchema);
  }
  
  fs.writeFileSync(indexFile, html);
}

// 2. Update category files
const categoryIntros = {
  1: "แปรงไดร์กลมและไดร์เปียก (Blow Dry Brush) ผลิตจากวัสดุคุณภาพสูง ทนความร้อน ช่วยจับลอนและลดการดึงผม เหมาะสำหรับช่างซาลอนมืออาชีพ",
  2: "แปรงเกล้าผมและแปรงกระดูก (Styling Brushes) ดีไซน์พิเศษเพื่อการจัดแต่งทรงผมและการเกล้าผมที่ต้องการความประณีต",
  3: "หวีอีโต้ (Detangling Combs) ซี่ห่างพิเศษ ช่วยสางผมที่เปียกหรือพันกัน ลดการขาดหลุดร่วงของเส้นผมได้อย่างดีเยี่ยม",
  4: "หวีซอยและหวีสาง (Cutting Combs) ฟันหวีเรียงชิด จับช่อผมได้ตึงและแม่นยำ ทนความร้อนสูง เหมาะกับงานตัดซอย",
  5: "หวีหางหนูและหวียี (Tail & Teasing Combs) ปลายแหลมสำหรับแบ่งช่อผมและแสกผม พร้อมซี่หวีสำหรับยีโคนผมให้ดูมีวอลลุ่ม",
  6: "อุปกรณ์ย้อมผม (Coloring Tools) ชุดถ้วยย้อมและแปรงป้ายสีผม ขนแปรงนุ่มกระจายสีได้สม่ำเสมอ ไม่ทำลายหนังศีรษะ",
  7: "แปรงขัดเล็บ (Nail Brushes) แปรงขัดทำความสะอาดเล็บมือและเท้า ขนแปรงสปริงตัวดี ไม่ทำร้ายผิว"
};

for (let i = 1; i <= 7; i++) {
  const catFile = path.join(projectDir, `category-${i}.html`);
  if (!fs.existsSync(catFile)) continue;
  
  let html = fs.readFileSync(catFile, 'utf8');
  
  // Update Nav
  html = html.replace(/<nav class="nav">[\s\S]*?<\/nav>/, newNav);
  
  // Add active class to the current category in nav
  const activePattern = new RegExp(`href="category-${i}.html"`);
  html = html.replace(activePattern, `href="category-${i}.html" class="active"`);
  
  // Inject Introduction paragraph if not exists
  if (!html.includes('<p class="category-intro">')) {
    const introHtml = `</h2>\n    <p class="category-intro" style="text-align:center; max-width:800px; margin: 0 auto 2rem; color: #6C5A4F; font-size:1.1rem; line-height: 1.6;">${categoryIntros[i]}</p>`;
    html = html.replace('</h2>', introHtml);
  }
  
  fs.writeFileSync(catFile, html);
}

console.log('SEO updates applied to all pages successfully.');
