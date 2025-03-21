import mongoose from "mongoose";
import dotenv from "dotenv";
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

export default connectDB;
