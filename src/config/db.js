const mongoose = require("mongoose");
Promise = require('bluebird');
const env = require("./env");


mongoose.Promise = Promise;
// const connectDB = async () => {
//   console.log(env.MONGO_HOST);

//   try {
//     if (env.NODE_ENV === "development1") {
//       // mongoose.set("debug", true);
//       await mongoose.connect(env.URI_DB);
//     console.log("✅ Kết nối MongoDB Atlas cá nhân thành công!");

//     } else {
//       // await mongoose.connect(env.MONGO_HOST, {
//       //   user: env.MONGO_USERNAME,
//       //   pass: env.MONGO_PASSWORD,
//       //   serverSelectionTimeoutMS: 5000,
//       // });
//     console.log("✅ Kết nối MongoDB Atlas company thành công!");
//     }

//   } catch (error) {
//     console.log("❌ Lỗi kết nối MongoDB:", error);
//     process.exit(1);
//   }
// };
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
