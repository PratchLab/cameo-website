const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';

const shopeeLinks = {
  'category-1.html': 'https://shopee.co.th/Cameo-Blow-Dry-Brushes-แปรงไดร์กลม-แปรงไดร์เปียก-มีหลายแบบให้เลือก-(E-Series-OK-Series-RM-Series)-i.42125554.45603461690?extraParams=%7B%22display_model_id%22%3A262275173638%2C%22model_selection_logic%22%3A3%7D',
  'category-2.html': 'https://shopee.co.th/Cameo-Vent-Cushion-Brushes-แปรงเกล้า-แปรงกระดูก-ดีไซน์โค้งตามรูปศีรษะ-สางผมได้เร็ว-ไม่ดึงรั้ง-i.42125554.46503467110?extraParams=%7B%22display_model_id%22%3A297275037506%2C%22model_selection_logic%22%3A3%7D',
  'category-3.html': 'https://shopee.co.th/Cameo-Flat-Detangle-Combs-หวีอีโต้-แปรงหวีผม-ขนาดกะทัดรัด-สีพาสเทลสดใส-พกพาง่าย-หวีลื่นไม่กินผม-i.42125554.52353442373?extraParams=%7B%22display_model_id%22%3A282275091533%2C%22model_selection_logic%22%3A3%7D',
  'category-4.html': 'https://shopee.co.th/Cameo-(Cutting-Sectioning-Combs)-หวีซอย-หวีสาง-ฟันหวีแข็งแรง-ไม่หักง่าย-ออกแบบให้ใช้งานง่าย-สะดวก-i.42125554.48303505947?extraParams=%7B%22display_model_id%22%3A320334581457%2C%22model_selection_logic%22%3A3%7D',
  'category-5.html': 'https://shopee.co.th/Cameo-(Tail-Teasing-Combs)-หวีหางหนู-หวียี-สำหรับแสกผม-จัดทรง-ใช้งานง่าย-ไม่ดึงผม-น้ำหนักเบา-ทนความร้อน-i.42125554.46153515618?extraParams=%7B%22display_model_id%22%3A390334857991%2C%22model_selection_logic%22%3A3%7D',
  'category-6.html': 'https://shopee.co.th/Cameo-(Coloring-Tools)-อุปกรณ์ย้อมผม-หวีย้อมผม-แปรงย้อมขนาดใหญ่-ขนแน่น-ป้ายสีได้รวดเร็วและทั่วถึง-i.42125554.48153511408?extraParams=%7B%22display_model_id%22%3A430334914731%2C%22model_selection_logic%22%3A3%7D',
  'category-7.html': 'https://shopee.co.th/Cameo-(Nail-Brushes)-แปรงขัดเล็บ-ดีไซน์จับถนัดมือ-ขนแปรงแน่น-ออกแบบเพื่อการขัดเล็บโดยเฉพาะ-ไม่บาดผิว-i.42125554.40377434144?extraParams=%7B%22display_model_id%22%3A365334976301%2C%22model_selection_logic%22%3A3%7D'
};

for (const [file, link] of Object.entries(shopeeLinks)) {
  const filePath = path.join(projectDir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let html = fs.readFileSync(filePath, 'utf8');
  
  // We want to wrap: <img src="..." alt="..." ... />
  // that is inside <div class="product-image-wrapper">
  
  // Regex to match the image tag inside the wrapper
  // Avoid re-wrapping if already wrapped
  const imgRegex = /(<div class="product-image-wrapper">\s*)(<img[^>]+>)/g;
  
  html = html.replace(imgRegex, (match, prefix, imgTag) => {
    // If it's already wrapped in an <a> tag, do nothing
    if (imgTag.includes('<a href=')) {
      return match;
    }
    // Check if the HTML around this already has an <a> tag. 
    // Usually regex on HTML is tricky, so we just check if it's already an <a>...</a>
    // Wait, the regex captures exactly <img...>. So we can wrap it.
    return `${prefix}<a href="${link}" target="_blank" rel="noopener noreferrer">${imgTag}</a>`;
  });
  
  fs.writeFileSync(filePath, html);
  console.log(`Updated images with links in ${file}`);
}
