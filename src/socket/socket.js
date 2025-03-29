const { Server} = require("socket.io");
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
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (error) {
      console.error("Lỗi xác thực JWT:", error.message);
      if (error.name === "TokenExpiredError") {
        return next(new Error("jwt expired"));
      }
      return next(new Error("Token không hợp lệ"));
    }
  });

  io.on("connection", async (socket) => {
    console.log(`User ${socket.userId} connected`);
    socket.join(socket.userId);

    const user = await User.findById(socket.userId);
    if (!user.isOnline) {
      await User.findByIdAndUpdate(socket.userId, { isOnline: true });
      io.emit("update_user_online", await getOnlineUsers());
    }

    socket.on("disconnect", async () => {
      console.log(`User ${socket.userId} disconnected`);
      if (io.sockets.adapter.rooms.get(socket.userId)?.size === 0) {
        await User.findByIdAndUpdate(socket.userId, { isOnline: false });
        io.emit("update_user_online", await getOnlineUsers());
      }
    });
  });

  const getOnlineUsers = async () => {
    return await User.find({ isOnline: true }).select(
      "_id userName email avatar"
    );
  };

  setInterval(async () => {
    try {
      const onlineUsers = await getOnlineUsers();
      io.emit("update_user_online", onlineUsers);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user online:", error);
    }
  }, 10000);
};

module.exports =  initSocket;
