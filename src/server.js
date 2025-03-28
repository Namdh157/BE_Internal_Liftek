const express = require("express")
const env = require("./config/env.js");
const cors = require("cors");
const router = require("./routes/index.js");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");
const swaggerDocs = require("./config/swaggerConfig.js");
const { connectRedis } = require("./config/redisClient.js");
const ErrorMiddleware = require("./middlewares/error.middleware.js");
const listEndpoints = require("express-list-endpoints"); // eslint-disable-line
const app = express();
const PORT = env.PORT;

connectDB();
connectRedis();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.11.11:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
swaggerDocs(app);

//middleware xử lý lỗi
app.use(ErrorMiddleware.notFound); // xử lý lỗi 404
app.use(ErrorMiddleware.errorHandle); // xử lý lỗi chung

// console.log(listEndpoints(app)); 


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server đang chạy tại ${process.env.BASE_URL}`);
});