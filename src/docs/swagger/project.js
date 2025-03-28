const projectSwagger = {
  "/projects": {
    post: {
      summary: "Tạo dự án mới",
      description: "API tạo dự án mới",
      tags: ["Project"],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Project",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Dự án tạo thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Project",
              },
            },
          },
        },
        400: {
          description: "Lỗi dữ liệu đầu vào",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Tên dự án không được để trống",
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
                    example: "Internal server error",
                  },
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Lấy tất cả dự án",
      description: "API lấy danh sách tất cả dự án",
      tags: ["Project"],

      parameters: [
        {
          in: "query",
          name: "page",
          description: "Trang hiện tại (mặc định là 1)",
          required: false,
          schema: {
            type: "integer",
            example: 1,
          },
        },
        {
          in: "query",
          name: "limit",
          description: "Số lượng dự án trên mỗi trang (mặc định là 10)",
          required: false,
          schema: {
            type: "integer",
            example: 10,
          },
        },
      ],
      responses: {
        200: {
          description: "Danh sách dự án",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "success" },
                  total: { type: "number", example: 1 },
                  page: { type: "number", example: 1 },
                  limit: { type: "number", example: 10 },
                  totalPages: { type: "number", example: 1 },
                  projects: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Project",
                    },
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
                    example: "Internal server error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/projects/{id}": {
    get: {
      summary: "Lấy chi tiết dự án theo ID",
      description: "API lấy chi tiết dự án",
      tags: ["Project"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID dự án",
          schema: {
            type: "string",
            example: "67d8e8e1035634767a0de23d",
          },
        },
      ],
      responses: {
        200: {
          description: "Thông tin chi tiết dự án",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Project",
              },
            },
          },
        },
        404: {
          description: "Dự án không tìm thấy",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Dự án không tìm thấy",
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
                    example: "Internal server error",
                  },
                },
              },
            },
          },
        },
      },
    },

    put: {
      summary: "Cập nhật dự án theo ID",
      description: "API cập nhật thông tin dự án",
      tags: ["Project"],

      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID dự án",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Dự án nâng cấp hệ thống ERP",
                },
                code: {
                  type: "number",
                  example: 87654321,
                },
                description: {
                  type: "string",
                  example: "Dự án nâng cấp hệ thống ERP để tối ưu hiệu suất",
                },
                status: {
                  type: "number",
                  example: 2,
                },
                managerId: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      example: "67d917e97f40a50f71b9b1f1",
                    },
                  },
                },
                addMembers: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                      },
                    },
                  },
                  example: [
                    { _id: "67d45e67a89f23a7d3e12f4b" },
                    { _id: "67d3946b9e89d674a5872f3f" },
                  ],
                },
                removeMembers: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                      },
                    },
                  },
                  example: [{ _id: "67d917e97f40a50f71b9b1f1" }],
                },
                priority: {
                  type: "number",
                  example: 0,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Cập nhật dự án thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Project",
              },
            },
          },
        },
        400: {
          description: "Lỗi dữ liệu đầu vào",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Tên dự án không được để trống",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Dự án không tìm thấy",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Dự án không tìm thấy",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Lỗi server",
        },
      },
    },

    delete: {
      summary: "Xoá dự án theo ID",
      description: "API xoá dự án",
      tags: ["Project"],

      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID dự án",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Xoá dự án thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Xoá dự án thành công",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Dự án không tìm thấy",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Dự án không tìm thấy",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Lỗi server",
        },
      },
    },
  },

  "/projects/{id}/manager": {
    get: {
      summary: "Lấy thông tin người quản lý dự án",
      description: "API lấy thông tin người quản lý dự án",
      tags: ["Project"],

      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID dự án",
          schema: {
            type: "string",
            example: "67d8e8e1035634767a0de23d",
          },
        },
      ],
      responses: {
        200: {
          description: "Thông tin người quản lý dự án",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  manager: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                      email: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Dự án không tìm thấy",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Dự án không tìm thấy",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Lỗi server",
        },
      },
    },
  },
  "/projects/{id}/members": {
    get: {
      summary: "Lấy thông tin members tham gia dự án theo id  ",
      description: "API lấy thông tin members tham gia dự án theo id ",
      tags: ["Project"],

      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID dự án",
          schema: {
            type: "string",
            example: "67d8e8e1035634767a0de23d",
          },
        },
      ],
      responses: {
        200: {
          description: "Thông tin menbers tham gia dự án",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  manager: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                      email: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Dự án không tìm thấy",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Dự án không tìm thấy",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Lỗi server",
        },
      },
    },
  },
  "/projects/search": {
    get: {
      summary: "Tìm kiếm Project theo name , (theo người dùng đăng nhập)",
      description:
        "Trả về dữ liệu được tìm kiếm theo name và người dùng đó đăng nhập",
      tags: ["Project"],
      parameters: [
        {
          in: "query",
          name: "name",
          required: true,
          description: "Tìm kiếm dự án theo tên",
          schema: {
            type: "string",
            example: "Tạo API cho hệ thống",
          },
        },
      ],
      responses: {
        200: {
          description: "Lấy danh sách công việc theo Title",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Project",
              },
            },
          },
        },
        500: {
          description: "Lỗi phía server",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Internal server error",
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

module.exports = projectSwagger;
