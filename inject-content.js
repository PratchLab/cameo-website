const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';
const mdPath = path.join(projectDir, 'resource/cameo catalogue and sku/CAMEO_Catalogue_Formatted_20pages edit table.md');
const mdContent = fs.readFileSync(mdPath, 'utf8');

// 1. Extract SKUs and Descriptions from tables
const skuMap = {};
// Match table rows: | **SKU** | Description | Price |
const rowRegex = /\|\s*\*\*(.*?)\*\*\s*\|\s*(.*?)\s*\|/g;
let match;
while ((match = rowRegex.exec(mdContent)) !== null) {
  const sku = match[1].trim();
  let desc = match[2].trim();
  
  // Try to split by common dashes to get just the description part
  // e.g. "แปรงไดร์กลมขนสัตว์ด้ามดำ ขนาด 12 มม. – สำหรับปลายผมสั้น" -> "สำหรับปลายผมสั้น"
  if (desc.includes('–')) { // en dash
    desc = desc.split('–').slice(1).join('–').trim();
  } else if (desc.includes('-')) { // hyphen
    desc = desc.split('-').slice(1).join('-').trim();
  }
  
  skuMap[sku] = desc;
}

// 2. Extract Category Features
// Let's hardcode the mapping of categories to their feature lists for accuracy based on the MD
const categoryFeatures = {
  'category-1.html': [
    'ขนแปรงทำจากขนสัตว์แท้ ผสมไนล่อนในบางรุ่น',
    'ด้ามไม้แท้และดีไซน์รับมือ จับกระชับ ไม่ลื่น',
    'ทนความร้อนจากไดร์ ใช้ได้ทั้งร้านเสริมสวยและผู้ใช้งานทั่วไป',
    'มีหลายรูปทรงและโทนสีให้เลือกใช้งาน'
  ],
  'category-2.html': [
    'แปรงดีไซน์โค้งตามรูปศีรษะ สางผมได้เร็ว ไม่ดึงรั้ง',
    'แปรงกระดูกมีปุ่มนวดหนังศีรษะ ช่วยผ่อนคลายระหว่างสางผม',
    'แปรงหนีบสำหรับจัดแต่งผมตรงหรือผมลอนให้เรียบร้อย'
  ],
  'category-3.html': [
    'ฟันหวีเรียงสวย หวีลื่น ไม่กินผม เหมาะทั้งผมเปียกและแห้ง',
    'มีหลายขนาดให้เลือก ทั้งเล็ก กลาง ใหญ่ ตอบโจทย์ทุกสไตล์',
    'ดีไซน์ทันสมัย สีหวาน สีคลาสสิก และลายวินเทจ',
    'รุ่นไฟเบอร์ทนความร้อนสูง ใช้คู่กับไดร์ร้อนได้อย่างมั่นใจ'
  ],
  'category-4.html': [
    'หวีฟันแข็งแรง ไม่หักง่าย เหมาะกับงานซอยและแยกผมอย่างแม่นยำ',
    'มีให้เลือกหลายรูปทรงและขนาด ทั้งแบบยาว พิเศษ หางเฉียง และปลายแหลม',
    'เหมาะกับทุกระดับฝีมือ ตั้งแต่มือใหม่จนถึงมืออาชีพ',
    'วัสดุทนความร้อน ใช้คู่กับไดร์ร้อนได้ โดยเฉพาะรุ่นไฟเบอร์'
  ],
  'category-5.html': [
    'เหมาะสำหรับงานแสกผม แบ่งช่อ และยีวอลลุ่ม ทั้งในซาลอนและใช้งานส่วนตัว',
    'ฟันหวีแน่น แข็งแรง หลากหลายรูปทรง ใช้ได้กับทุกประเภทเส้นผม',
    'มีให้เลือกทั้งแบบปลายพลาสติกและหางเหล็ก แม่นยำในการแสกผมและจัดทรง',
    'วัสดุไฟเบอร์และพลาสติกคุณภาพดี น้ำหนักเบา ทนความร้อน ใช้คู่กับไดร์ได้'
  ],
  'category-6.html': [
    'ครบทุกขั้นตอนการย้อมผม ตั้งแต่แบ่งผม ย้อมสี ไปจนถึงการผสมสี',
    'ขนแปรงแน่น ป้ายสีได้ทั่วถึง ช่วยให้ย้อมสีเรียบเนียน ไม่เปลืองผลิตภัณฑ์',
    'มีให้เลือกหลายขนาด สำหรับงานละเอียด เช่น โคนผม และงานใหญ่เช่นย้อมทั่วศีรษะ',
    'เหมาะสำหรับทั้งมืออาชีพและผู้ใช้ทั่วไป'
  ],
  'category-7.html': [
    'ออกแบบเพื่อการขัดเล็บโดยเฉพาะ ทำความสะอาดซอกเล็บได้ลึกและทั่วถึง',
    'ขนแปรงแน่นกำลังดี ไม่บาดผิว ไม่กินเนื้อเล็บ',
    'มีหลายขนาดและทรงให้เลือก ทั้งแบบเตารีดและดีไซน์อิตาลีจับถนัดมือ',
    'พกพาสะดวก ใช้งานง่าย สีสันสดใส'
  ]
};

// 3. Process HTML files
const files = fs.readdirSync(projectDir).filter(f => f.startsWith('category-') && f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Inject product descriptions
  // Regex to find: <div class="product-code">SKU</div> \n <h3 ...>Name</h3>
  const productRegex = /<div class="product-code">(.*?)<\/div>\s*<h3 class="product-name">(.*?)<\/h3>/g;
  
  html = html.replace(productRegex, (match, sku, name) => {
    if (skuMap[sku]) {
      // Check if already injected
      if (html.includes(`<p class="product-desc">${skuMap[sku]}</p>`)) {
        return match;
      }
      return `${match}\n          <p class="product-desc">${skuMap[sku]}</p>`;
    }
    return match;
  });

  // Inject category features
  const features = categoryFeatures[file];
  if (features && !html.includes('<section class="category-features">')) {
    let featureHtml = `\n    <section class="category-features">\n      <h3>✨ จุดเด่นสินค้า</h3>\n      <ul>\n`;
    features.forEach(f => {
      featureHtml += `        <li>✅ ${f}</li>\n`;
    });
    featureHtml += `      </ul>\n    </section>\n  `;
    
    // Inject before </main>
    html = html.replace('</main>', featureHtml + '</main>');
  }

  fs.writeFileSync(filePath, html);
  console.log(`Updated ${file}`);
});

console.log('Content injection complete.');
