import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(process.cwd(), 'src'), function(filePath) {
  if (filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace internal imports missing .js
    // Match: import ... from './something' or '../something'
    // Exclude: if it already ends in .js' or .js"
    const regex = /(from\s+['"])(\.\/[^'"]+|\.\.\/[^'"]+)(['"])/g;
    let modified = content.replace(regex, (match, p1, p2, p3) => {
      if (!p2.endsWith('.js')) {
        return p1 + p2 + '.js' + p3;
      }
      return match;
    });

    if (content !== modified) {
      fs.writeFileSync(filePath, modified, 'utf8');
      console.log(`Updated imports in ${filePath}`);
    }
  }
});
