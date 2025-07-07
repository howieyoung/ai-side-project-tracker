const fs = require('fs');

console.log('Creating placeholder icons...');

// Create simple placeholder files that reference the SVG
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create a simple 1x1 transparent PNG as base64
const transparentPNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

sizes.forEach(size => {
    const buffer = Buffer.from(transparentPNG, 'base64');
    fs.writeFileSync(`icons/icon-${size}x${size}.png`, buffer);
    console.log(`Created placeholder icon-${size}x${size}.png`);
});

console.log('All icons created! You can use create_icons.html to generate proper icons.');
console.log('Or manually copy your own PNG icons to the icons/ directory.'); 