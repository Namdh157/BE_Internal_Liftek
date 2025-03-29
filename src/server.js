const express = require("express");
const http = require("http"); // Thêm module http
const env = require("./config/env.js");
const cors = require("cors");
const router = require("./routes/index.js");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");
const swaggerDocs = require("./config/swaggerConfig.js");
const { connectRedis } = require("./config/redisClient.js");
const ErrorMiddleware = require("./middlewares/error.middleware.js");
const initSocket = require("./socket/socket.js"); // Import file socket

const app = express();
const PORT = env.PORT;

// Tạo server HTTP từ app (quan trọng)
const server = http.createServer(app);

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

// Middleware xử lý lỗi
app.use(ErrorMiddleware.notFound);
app.use(ErrorMiddleware.errorHandle);

// Khởi động Socket.io trên cùng server HTTP
initSocket(server);

// Chạy server HTTP chung cho Express + Socket.io
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server đang chạy tại ${process.env.BASE_URL}`);
});
