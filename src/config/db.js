const mongoose = require("mongoose");
const Promise = require("bluebird");
const env = require("./env");

mongoose.Promise = Promise;
const connectDB = async () => {
  try {
    if (env.NODE_ENV === "development") {
      // mongoose.set("debug", true);
      await mongoose.connect(env.URI_DB);
      console.log("✅ Kết nối MongoDB Atlas cá nhân thành công!");
    } else {
      await mongoose.connect(env.MONGO_HOST, {
        user: env.MONGO_USERNAME,
        pass: env.MONGO_PASSWORD,
        serverSelectionTimeoutMS: 5000,
      });
      console.log("✅ Kết nối MongoDB Atlas company thành công!");
    }
  } catch (error) {
    console.log("❌ Lỗi kết nối MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
