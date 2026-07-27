const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';
const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Match all <img ...> tags
  const imgRegex = /<img[^>]+>/g;
  let hasChanges = false;
  
  html = html.replace(imgRegex, (imgTag) => {
    // If it already has an alt tag, we might want to check if it's empty, but let's just make sure all have an alt tag.
    if (!imgTag.includes('alt=')) {
      // Extract src to guess alt
      const srcMatch = imgTag.match(/src="([^"]+)"/);
      let altText = "Cameo Hair Brush";
      if (srcMatch) {
        // e.g. "resource/Cameo%20image/1%20แปรงไดร์กลม/B106.jpg" -> "B106"
        const filename = srcMatch[1].split('/').pop().replace(/%20/g, ' ').split('.')[0];
        altText = `อุปกรณ์ทำผม Cameo รุ่น ${filename}`;
      }
      hasChanges = true;
      // Insert alt before src
      return imgTag.replace('src=', `alt="${altText}" src=`);
    } else {
      // If it has alt="", replace it
      if (imgTag.includes('alt=""')) {
        const srcMatch = imgTag.match(/src="([^"]+)"/);
        let altText = "Cameo Hair Brush";
        if (srcMatch) {
          const filename = srcMatch[1].split('/').pop().replace(/%20/g, ' ').split('.')[0];
          altText = `อุปกรณ์ทำผม Cameo รุ่น ${filename}`;
        }
        hasChanges = true;
        return imgTag.replace('alt=""', `alt="${altText}"`);
      }
    }
    return imgTag;
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, html);
    console.log(`Updated Alt tags in ${file}`);
  }
});
