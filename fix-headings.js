const fs = require('fs');
const path = require('path');

const projectDir = '/Users/pratch/Downloads/Project/Cameo Website';
const files = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(projectDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Change <h1 class="site-title"> to <div class="site-title"> (if it's not index.html)
  // Actually, even on index.html, it's better if the main hero heading is the H1.
  html = html.replace(/<h1 class="site-title">Cameo Thailand<\/h1>/g, '<div class="site-title">Cameo Thailand</div>');

  // 2. Change the first <h2> in <main> to <h1>
  // For index.html, the main hero heading is "แปรงและอุปกรณ์ดูแลเส้นผม..." but it's an <h2>. Let's make it <h1>.
  if (file === 'index.html') {
    html = html.replace(/<h2>(แปรงและอุปกรณ์ดูแลเส้นผมคุณภาพพรีเมี่ยม.*?)<\/h2>/, '<h1>$1</h1>');
  } else {
    // For other pages, the first <h2> inside <main> is the page title.
    html = html.replace(/<main[^>]*>[\s\S]*?(<article[^>]*>)?\s*<h2>(.*?)<\/h2>/, (match, articleTag, title) => {
      // Reconstruct but replace <h2> with <h1>
      return match.replace(`<h2>${title}</h2>`, `<h1>${title}</h1>`);
    });
  }

  // 3. For FAQ, let's remove "Q:" and "A:" prefixes to make it more conversational for AI
  if (file === 'faq.html') {
    html = html.replace(/<div class="faq-question">Q:\s*/g, '<div class="faq-question">');
    html = html.replace(/<div class="faq-answer">A:\s*/g, '<div class="faq-answer">');
  }

  fs.writeFileSync(filePath, html);
  console.log(`Updated headings in ${file}`);
});
