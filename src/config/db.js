const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI_DB);
    console.log("✅ Kết nối MongoDB Atlas thành công!");
  } catch (error) {
    console.log("❌ Lỗi kết nối MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
