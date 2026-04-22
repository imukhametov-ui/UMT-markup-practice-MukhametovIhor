const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');

const spriter = new SVGSpriter({
  mode: {
    symbol: {
      dest: '.',
      sprite: 'sprite.svg',
    },
  },
});

const iconsDir = './src/icons';

fs.readdirSync(iconsDir).forEach(file => {
  const filePath = path.join(iconsDir, file);

  if (path.extname(file) === '.svg' && file !== 'sprite.svg') {
    spriter.add(filePath, file, fs.readFileSync(filePath, 'utf-8'));
  }
});

spriter.compile((error, result) => {
  if (error) {
    console.error(error);
    return;
  }

  for (const mode in result) {
    for (const resource in result[mode]) {
      fs.writeFileSync('./src/icons/sprite.svg', result[mode][resource].contents);
    }
  }

  console.log('sprite.svg created successfully');
});