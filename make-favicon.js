const Jimp = require('/tmp/node_modules/jimp');

Jimp.read('resource/Cameo image/Logo Cameo.png')
  .then(img => {
    // 1. Remove all transparent padding first so we know exact bounds
    img.autocrop();
    
    // 2. The "C" is roughly the first 28% of the width, and top 60% of the height
    // (avoiding the 'Professional' text below and 'a' to the right).
    const cWidth = Math.floor(img.bitmap.width * 0.28);
    const cHeight = Math.floor(img.bitmap.height * 0.60);
    img.crop(0, 0, cWidth, cHeight);

    // 3. Turn all non-transparent pixels to white
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
      const alpha = this.bitmap.data[idx + 3];
      if (alpha > 0) {
        this.bitmap.data[idx + 0] = 255;
        this.bitmap.data[idx + 1] = 255;
        this.bitmap.data[idx + 2] = 255;
      }
    });

    // 4. Auto-crop to tightly wrap the C
    img.autocrop();

    // 5. Resize to 64x64
    img.contain(64, 64, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);

    return img.writeAsync('favicon.png');
  })
  .then(() => console.log('Favicon C created successfully'))
  .catch(err => console.error(err));
