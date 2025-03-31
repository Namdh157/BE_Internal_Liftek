const socketSwagger = {
  "/socket/connect": {
    post: {
      summary: "Kết nối WebSocket",
      description: "Kết nối WebSocket để nhận sự kiện từ server.",
      tags: ["Socket"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                url: {
                  type: "string",
                  description: "URL WebSocket để kết nối",
                  example: "ws://192.168.1.116:5000",
                },
              },
              required: ["url"],
            },
          },
        },
      },
      responses: {
        101: {
          description: "WebSocket kết nối thành công",
        },
        400: {
          description: "Lỗi kết nối WebSocket",
        },
      },
    },
  },

  "/socket/events/update_user_online": {
    get: {
      summary: "Lắng nghe sự kiện update_user_online",
      description:
        "Client nhận sự kiện `update_user_online` từ server khi trạng thái user thay đổi.",
      tags: ["Socket"],
      responses: {
        200: {
          description: "Nhận dữ liệu danh sách user online từ WebSocket",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  event: {
                    type: "string",
                    example: "update_user_online",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        userId: {
                          type: "string",
                          example: "64f8d12e7c1b5a001f5c6b12",
                        },
                        userName: { type: "string", example: "johndoe" },
                        status: { type: "string", example: "online" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = socketSwagger;
