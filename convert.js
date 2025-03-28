const fs =  require("fs")
const path = require("path");

const dir = "./src"; // Thư mục chứa file cần convert

function convertFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");

    // Chuyển `import ... from '...'` thành `const ... = require("...")`
    content = content.replace(/import (.*?) from ['"](.*?)['"]/g, 'const $1 = require("$2")');
  
    // Chuyển `export default` thành `module.exports =`
    content = content.replace(/export default /g, "module.exports = ");
  
    // Chuyển `export` thành `exports`
    content = content.replace(/export (const|let|var|function|class) (.*?) =/g, 'exports.$2 =');
  
     // Chuyển `export { functionA, functionB };` thành `module.exports = { functionA, functionB };`
     content = content.replace(/export\s*{([^}]*)};/g, (_, exportsList) => {
        return `module.exports = {${exportsList.trim()}};`;
    });

    // Thay tất cả dấu nháy đơn thành dấu nháy kép (chỉ trong chuỗi)
    content = content.replace(/'([^']*)'/g, '"$1"');
  
    fs.writeFileSync(filePath, content, "utf8");
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath);
    } else if (filePath.endsWith(".js")) {
      convertFile(filePath);
    }
  });
}

walk(dir);
console.log("✅ Chuyển đổi hoàn tất! Tất cả `require()` đều dùng dấu nháy kép.");
