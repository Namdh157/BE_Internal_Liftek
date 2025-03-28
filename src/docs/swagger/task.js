const { STATUS } = require("../../constants/statusConstants.js");

const taskSwagger = {
  "/tasks": {
    post: {
      summary: "Tạo nhiệm vụ mới",
      description: "API tạo nhiệm vụ mới",
      tags: ["Task"],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Fix login bug",
                },
                description: {
                  type: "string",
                  example: "Fix login bug",
                },
                assigneeId: {
                  type: "array",
                  description: "ID người được giao nhiệm vụ",
                  items: {
                    type: "string",
                    example: "67d3f05b2c209d64023d0d9d",
                  },
                },
                assignerId: {
                  type: "string",
                  example: "67d9160e6b6c2f5362dd5112",
                },
                startDate: {
                  type: "string",
                  example: "2024-03-10",
                },
                endDate: {
                  type: "string",
                  example: "2024-03-15",
                },
                projectId: {
                  type: "string",
                  example: "67d8dd65edc970e80f2ed0a4",
                },
                status: {
                  type: "number",
                  example: 1,
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "Ảnh của task",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Nhiệm vụ tạo thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
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
                    example: "Tiêu đề không được để trống",
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
      summary: "Lấy danh sách tất cả công việc",
      description: "Trả về danh sách các công việc trong hệ thống",

      tags: ["Task"],
       "parameters": [
      {
        "in": "query",
        "name": "page",
        "required" : false,
        "description": "Phân trang hiện tại",
        "schema": {
          "type": "number",
          "example": 1
        }
      },
      {
        "in": "query",
        "name": "limit",
        "required": false,
        "description": "Số lượng hiển thị",
        "schema": {
          "type": "number",
          "example": 10
        }
      },  
    ],
      responses: {
        200: {
          description: "Lấy danh sách vấn đề thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
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
    delete: {
      summary: "Xoá nhiều vấn đề theo ID",
      description: "API xoá dự án",
      tags: ["Task"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                ids: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  example: [
                    "67d8ebc88d93c6abba32d5a5",
                    "67d8f0df1dc8e20c175bffa8",
                  ],
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Xoá vấn đề thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Task deleted successfully",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Không tìm thấy vấn đề",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Task not found",
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
  "/tasks/{taskId}": {
    get: {
      summary: "Lấy thông tin chi tiết",
      description: "Trả về thống tin chi tiết của task",
      tags: ["Task"],
      parameters: [
        {
          in: "path",
          name: "taskId",
          required: true,
          description: "ID task",
          schema: {
            type: "string",
            example: "67d8e3e2835b109d2e16bd89",
          },
        },
      ],
      responses: {
        200: {
          description: "Lấy thống tin chi tiết task thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        404: {
          description: "Khoông tìm thấy task",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Task not found",
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
      summary: "chỉnh sửa nhiệm vụ",
      description: "API chỉnh sửa nhiệm vụ",
      tags: ["Task"],
      parameters: [
        {
          in: "path",
          name: "taskId",
          required: true,
          description: "ID nhiệm vụ",
          schema: {
            type: "string",
            example: "60d4f6d3c2f2a00015f8a3d5",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Fix login bug",
                },
                description: {
                  type: "string",
                  example: "Fix login bug",
                },
                assigneeId: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "65f123abc123abcd12345678",
                  },
                  description: "ID người được giao nhiệm vụ",
                },
                assignerId: {
                  type: "string",
                  example: "65f456def456defg45678901",
                },
                startDate: {
                  type: "string",
                  example: "2024-03-10",
                },
                endDate: {
                  type: "string",
                  example: "2024-03-15",
                },
                projectId: {
                  type: "string",
                  example: "60d4f6d3c2f2a00015f8a3d5",
                },
                status: {
                  type: "number",
                  example: 2,
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "Ảnh của task",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Nhiệm vụ chỉnh sửa thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
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
                    example: "Tiêu đề không được để trống",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Nhiệm vụ không tìm thấy",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Nhiệm vụ không tìm thấy",
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
    delete: {
            summary: "Xoá vấn đề theo ID",
            description: "API xoá dự án",
            tags: ["Task"],
            parameters: [
                {
                    in: "path",
                    name: "taskId",
                    required: true,
                    description: "ID task",
                    schema: {
                      type: "string",
                      example:"67d8e401835b109d2e16bd8d"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Xoá vấn đề thành công",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Xoá vấn đề thành công"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Không tìm thấy vấn đề",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "Không tìm thấy vấn đề"
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: "Lỗi server"
                }
            }
    },
  },
  "/tasks/{taskId}/status": {
    put: {
      summary: "Cập nhật trạng thái công việc",
      description: "Trả về  công việc đã thay đổi trạng thái trong hệ thống",
      tags: ["Task"],
      parameters: [
        {
          in: "path",
          name: "taskId",
          required: true,
          description: "ID nhiệm vụ",
          schema: {
            type: "string",
            example: "67d3f68ec0587825d1b151bb",
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
                oldStatus: {
                  type: "number",
                  example: 2,
                },
                newStatus: {
                  type: "number",
                  example: STATUS.FINISH,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Thay đổi trạng thái vấn đề thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        400: {
          description: "Lỗi phía server",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "task ID không phù hợp",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Lỗi phía server",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Không thấy task hợp lệ",
                  },
                },
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
  "/tasks/project/{projectId}": {
    get: {
      summary: "Lấy danh sách công việc theo dự án",
      description: "Trả về danh sách công việc theo dự án",
      tags: ["Task"],
      parameters: [
        {
          in: "path",
          name: "projectId",
          required: true,
          description: "ID dự án",
          schema: {
            type: "string",
            example: "60d4f6d3c2f2a00015f8a3d5",
          },
        },
      ],
      responses: {
        200: {
          description: "Lấy danh sách công việc theo dự án thành công",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
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
  "/tasks/search": {
    get: {
      summary: "Tìm kiếm công việc theo Title , (người dùng nhập)",
      description: "Trả về danh sách công việc theo Title",
      tags: ["Task"],
      parameters: [
        {
          in: "query",
          name: "search",
          required: true,
          description: "Tìm kiếm công việc theo Title",
          schema: {
            type: "string",
            example: "Tạo API cho hệ thống",
          },
        },
        {
          in: "query",
          name: "projectId",
          required: true,
          description: "Tìm kiếm công việc theo người nhận thuộc 1 project",
          schema: {
            type: "string",
            example: "67d8dd65edc970e80f2ed0a4",
          },
        },
      ],
      responses: {
        200: {
          description: "Lấy danh sách công việc theo Title",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
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
  "/tasks/filter/{projectId}": {
    post: {
      summary: "Lọc công việc theo người giao, người nhận, thời gian",
      description:
        "Trả về danh sách công việc theo người giao, người nhận, thời gian",
      tags: ["Task"],
      parameters: [
       {
        "in": "query",
        "name": "page",
        "required" : false,
        "description": "Phân trang hiện tại",
        "schema": {
          "type": "number",
          "example": 1
        }
      },
      {
        "in": "query",
        "name": "limit",
        "required": false,
        "description": "Số lượng hiển thị",
        "schema": {
          "type": "number",
          "example": 10
        }
      },  
        {
          in: "path",
          name: "projectId",
          required: true,
          description: "ID project",
          schema: {
            type: "string",
            example: "67d8ddb3edc970e80f2ed0a8",
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

                assigneeId: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "67d3a5ee5fb33b3c2442fb68",
                  },
                },
                assignerId: {
                  type: "string",
                  example: "67dd0e3b4e734fdc9ab4ba24",
                },
                startDate: {
                  type: "string",
                  example: "2025-03-15",
                },
                endDate: {
                  type: "string",
                  example: "2025-04-30",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Trả về vấn đề có thông tin tìm kiếm tương thích",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        400: {
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
  "/tasks/{taskId}/add-user": {
    post: {
      summary: "Thêm người dùng vào vấn đề",
      description: "Thêm người dùng vào vấn đề",
      tags: ["Task"],
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
            example: "67d8e401835b109d2e16bd8d",
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
                assigneeId: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "67dd0e3b4e734fdc9ab4ba24",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Thêm người dùng vào vấn đề",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Thêm người dùng vào vấn đề thành công",
                  },
                },
              },
            },
          },
        },
        403: {
          description: "Không đủ quyền",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Người dùng không đủ thẩm quyền",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Task not found",

          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Task không tìm thấy",
                  },
                },
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

module.exports = taskSwagger;
