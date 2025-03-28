const multer = require("multer");

// Cấu hình Multer (lưu file vào RAM, không lưu vào thư mục)
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

module.exports = upload;