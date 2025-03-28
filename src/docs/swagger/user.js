const userSwagger = {
  "/users": {
    get: {
      tags: ["User"],
      summary: "Lấy tất cả thông tin người dùng",
      parameters: [
        {
          in: "query",
          name: "page",
          required: false,
          description: "Trang hiện tại (mặc định là 1)",
          schema: {
            type: "integer",
            default: 1,
          },
        },
        {
          in: "query",
          name: "limit",
          required: false,
          description: "Số lượng bản ghi trên mỗi trang (mặc định là 10)",
          schema: {
            type: "integer",
            default: 10,
          },
        },
      ],
      responses: {
        200: {
          description: "Thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        401: {
          description: "Token không hợp lệ",
        },
        403: {
          description: "Không có quyền truy cập",
        },
        500: {
          description: "Lỗi server",
        },
      },
    },
  },
  "/users/update-profile": {
    put: {
      tags: ["User"],
      summary: "Cập nhật thông tin người dùng",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                avatar: {
                  type: "string",
                  format: "binary",
                  description: "Ảnh đại diện",
                },
                userName: {
                  type: "string",
                  example: "Nguyễn Văn B",
                },
                phone: {
                  type: "string",
                  example: "0123456789",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        401: {
          description: "Token không hợp lệ",
        },
        403: {
          description: "Không có quyền truy cập",
        },
        500: {
          description: "Lỗi server",
        },
      },
    },
  },
};

module.exports = { userSwagger };
