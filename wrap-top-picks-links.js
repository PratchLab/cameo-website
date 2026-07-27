const fs = require('fs');

const htmlPath = '/Users/pratch/Downloads/Project/Cameo Website/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const links = {
  'OK2481': 'https://shopee.co.th/Cameo-Blow-Dry-Brushes-แปรงไดร์กลม-แปรงไดร์เปียก-มีหลายแบบให้เลือก-(E-Series-OK-Series-RM-Series)-i.42125554.45603461690?extraParams=%7B%22display_model_id%22%3A262275173638%2C%22model_selection_logic%22%3A3%7D',
  'RM180': 'https://shopee.co.th/Cameo-Blow-Dry-Brushes-แปรงไดร์กลม-แปรงไดร์เปียก-มีหลายแบบให้เลือก-(E-Series-OK-Series-RM-Series)-i.42125554.45603461690?extraParams=%7B%22display_model_id%22%3A262275173638%2C%22model_selection_logic%22%3A3%7D',
  'VC503': 'https://shopee.co.th/Cameo-Flat-Detangle-Combs-หวีอีโต้-แปรงหวีผม-ขนาดกะทัดรัด-สีพาสเทลสดใส-พกพาง่าย-หวีลื่นไม่กินผม-i.42125554.52353442373?extraParams=%7B%22display_model_id%22%3A282275091533%2C%22model_selection_logic%22%3A3%7D',
  'VC803': 'https://shopee.co.th/Cameo-(Cutting-Sectioning-Combs)-หวีซอย-หวีสาง-ฟันหวีแข็งแรง-ไม่หักง่าย-ออกแบบให้ใช้งานง่าย-สะดวก-i.42125554.48303505947?extraParams=%7B%22display_model_id%22%3A320334581457%2C%22model_selection_logic%22%3A3%7D',
  'VC879': 'https://shopee.co.th/Cameo-(Tail-Teasing-Combs)-หวีหางหนู-หวียี-สำหรับแสกผม-จัดทรง-ใช้งานง่าย-ไม่ดึงผม-น้ำหนักเบา-ทนความร้อน-i.42125554.46153515618?extraParams=%7B%22display_model_id%22%3A390334857991%2C%22model_selection_logic%22%3A3%7D',
  'DYS001': 'https://shopee.co.th/Cameo-(Coloring-Tools)-อุปกรณ์ย้อมผม-หวีย้อมผม-แปรงย้อมขนาดใหญ่-ขนแน่น-ป้ายสีได้รวดเร็วและทั่วถึง-i.42125554.48153511408?extraParams=%7B%22display_model_id%22%3A430334914731%2C%22model_selection_logic%22%3A3%7D'
};

for (const [sku, link] of Object.entries(links)) {
  // Regex to find the <img> tag for this SKU inside the top picks section
  // It looks like: <img src="..." alt="..." class="pick-img rotate-diagonal" />
  // and we wrap it with <a href="..." target="_blank" rel="noopener noreferrer">...</a>
  // Let's use a regex that finds the img tag containing the SKU string in its src or near it
  const imgRegex = new RegExp(`(<img[^>]+${sku}[^>]+>)`, 'g');
  
  html = html.replace(imgRegex, (match, imgTag) => {
    if (imgTag.includes('<a ')) return match; // already wrapped
    // We only want to do this if it's NOT already inside an <a> tag
    // Since regex on HTML string is tricky, we can just replace the img tag directly.
    return `<a href="${link}" target="_blank" rel="noopener noreferrer" style="display:block;">${imgTag}</a>`;
  });
}

fs.writeFileSync(htmlPath, html);
console.log('Updated index.html top picks with Shopee links.');
