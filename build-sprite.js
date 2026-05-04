const fs = require('fs');
const path = require('path');

const iconsDir = './src/icons';
const output = './src/icons/sprite.svg';

let symbols = '';

fs.readdirSync(iconsDir).forEach((file) => {
  if (path.extname(file) !== '.svg' || file === 'sprite.svg') return;

  const id = file
    .replace('.svg', '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  let content = fs.readFileSync(path.join(iconsDir, file), 'utf-8');

  // Витягуємо атрибути viewBox
  const viewBox = (content.match(/viewBox="([^"]*)"/) || ['', '0 0 24 24'])[1];

  // Прибираємо зовнішній svg тег
  content = content
    .replace(/<\?xml[^>]*>/g, '')
    .replace(/<!DOCTYPE[^>]*>/g, '')
    .replace(/<svg[^>]*>/g, '')
    .replace(/<\/svg>/g, '')
    .trim();

  symbols += `  <symbol id="${id}" viewBox="${viewBox}">\n    ${content}\n  </symbol>\n`;
});

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${symbols}</svg>\n`;
fs.writeFileSync(output, sprite);
console.log('✅ sprite.svg created! Icons:');

// Вивести список id для зручності
fs.readdirSync(iconsDir).forEach((file) => {
  if (path.extname(file) !== '.svg' || file === 'sprite.svg') return;
  const id = file
    .replace('.svg', '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  console.log(`  #${id}  ←  ${file}`);
});
