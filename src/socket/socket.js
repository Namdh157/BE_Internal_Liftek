const { Server } = require("socket.io");
const User = require("../users/user.model.js");
const jwt = require("jsonwebtoken");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    transports: ["websocket", "polling"],
  });

  io.use((socket, next) => {
    const authHeader = socket.handshake.headers.authorization;
    if (!authHeader) {
      console.error("Không có header Authorization");
      return next(new Error("Không có token"));
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      console.log(">>>", decoded);
      next();
    } catch (error) {
      console.error("Lỗi xác thực JWT:", error.message);
      return next(new Error(error.name === "TokenExpiredError" ? "jwt expired" : "Token không hợp lệ"));
    }
  });

  io.on("connection", async (socket) => {
    console.log(`User ${socket.userId} connected`);
    socket.join(socket.userId);

    const user = await User.findById(socket.userId);
    if (user && !user.isOnline) {
      await User.findByIdAndUpdate(socket.userId, { isOnline: true });
      io.emit("update_user_online", await getOnlineUsers());
    }

    console.log(await getOnlineUsers());

    socket.on("disconnect", async () => {
      console.log(`User ${socket.userId} disconnected`);

      const room = io.sockets.adapter.rooms.get(socket.userId);
      if (!room || room.size === 0) {
        await User.findByIdAndUpdate(socket.userId, { isOnline: false });
        io.emit("update_user_online", await getOnlineUsers());
      }
    });
  });
};

const getOnlineUsers = async () => User.find({ isOnline: true }).select("_id userName email avatar");

module.exports = initSocket;
