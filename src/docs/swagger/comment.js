const CmtSwagger = {
  "/comments": {
    post: {
      summary: "Tạo bình luận",
      description: "API tạo bình luận trong 1 tasktask",
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Comment"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                taskId: {
                  type: "string",
                  example: "67d8e3f6835b109d2e16bd8b",
                },
                content: {
                  type: "string",
                  example: "Noi dung binh luan",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Thêm bình luận thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Thêm bình luận thành công",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Lỗi server",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Lỗi server",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/comments/{taskId}": {
    get: {
      summary: "Lấy danh sách bình luận",
      description: "API lấy danh sách bình luận",
      tags: ["Comment"],
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "taskId",
          required: true,
          description: "ID task",
          schema: {
            type: "string",
            example: "67d8e3f6835b109d2e16bd8b",
          },
        },
      ],
      responses: {
        200: {
          description: "Lấy danh sách bình luận",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Lấy danh sách bình luận",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Lỗi server",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Lỗi server",
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
module.exports = CmtSwagger;
