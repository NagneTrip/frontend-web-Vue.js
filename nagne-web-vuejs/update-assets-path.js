const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const assetPattern = /(['"`])(@\/assets\/|\/src\/assets\/)([^'"`]+)/g;

function updatePaths(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updatePaths(fullPath);
    } else if (path.extname(fullPath) === '.vue') {
      let content = fs.readFileSync(fullPath, 'utf-8');
      content = content.replace(assetPattern, '$1/assets/$3');
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(`Updated paths in ${fullPath}`);
    }
  }
}

updatePaths(srcDir);
