const fs = require('fs');

const htmlPath = '/Users/pratch/Downloads/Project/Cameo Website/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const testimonialsHtml = `
    <section class="testimonials" style="padding: 4rem 2rem; background: #FFFFFF; border-radius: 16px; box-shadow: 0 4px 15px rgba(74, 59, 50, 0.05); border: 1px solid #EAE3D9; margin-bottom: 3rem;">
      <h2 style="font-size: 2rem; color: #332822; text-align: center; margin-bottom: 2.5rem; font-weight: 600;">เสียงตอบรับจากช่างผมมืออาชีพ (Testimonials)</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1000px; margin: 0 auto;">
        <div style="background: #FDFBF7; padding: 2rem; border-radius: 12px; border: 1px solid #F0EAE1;">
          <div style="color: #A98467; font-size: 1.5rem; margin-bottom: 1rem;">★★★★★</div>
          <p style="font-style: italic; color: #5C4D43; line-height: 1.6; margin-bottom: 1.5rem;">"เปิดร้านมา 10 ปี ใช้แต่แปรงไดร์ของ Cameo มาตลอด ขนสัตว์แท้ทนความร้อนได้ดีมาก ลูกค้าชมว่าไดร์แล้วผมเงา ไม่เจ็บหนังศีรษะเลยค่ะ"</p>
          <p style="font-weight: 600; color: #332822;">— คุณแนน (เจ้าของซาลอนย่านทองหล่อ)</p>
        </div>
        <div style="background: #FDFBF7; padding: 2rem; border-radius: 12px; border: 1px solid #F0EAE1;">
          <div style="color: #A98467; font-size: 1.5rem; margin-bottom: 1rem;">★★★★★</div>
          <p style="font-style: italic; color: #5C4D43; line-height: 1.6; margin-bottom: 1.5rem;">"หวีหางหนูและหวีซอยของที่นี่ฟันแข็งแรงมาก ตกไม่หักง่ายๆ แบ่งช่อผมได้เป๊ะสุดๆ แนะนำช่างมือใหม่ควรมีติดกระเป๋าไว้เลยครับ"</p>
          <p style="font-weight: 600; color: #332822;">— ช่างเอก (แฮร์สไตลิสต์อิสระ)</p>
        </div>
      </div>
    </section>
`;

if (!html.includes('เสียงตอบรับจากช่างผมมืออาชีพ')) {
  html = html.replace('  </main>', testimonialsHtml + '\  </main>');
  fs.writeFileSync(htmlPath, html);
  console.log('Added Testimonials to index.html');
} else {
  console.log('Testimonials already exist.');
}
