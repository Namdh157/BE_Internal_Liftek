const authSwagger = {
  "/auth/register": {
    post: {
      summary: "Đăng ký tài khoản",
      description: "API đăng ký tài khoản mới",
      tags: ["Auth"],
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userName: {
                  type: "string",
                  example: "Nguyễn Văn A",
                },
                email: {
                  type: "string",
                  example: "example@gmail.com",
                },
                password: {
                  type: "string",
                  example: "123456",
                },
                confirmPassword: {
                  type: "string",
                  example: "123456",
                },
              },
              required: ["email", "password", "confirmPassword"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Đăng ký thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example:
                      "Đăng ký thành công! Vui lòng kiểm tra email để xác thực.",
                  },
                  user: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "65f0b8d0fbd3a6e9f8e2c9d5",
                      },
                      email: {
                        type: "string",
                        example: "user@example.com",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Email đã tồn tại hoặc lỗi dữ liệu đầu vào",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example:
                      "Email này đã được đăng ký, bạn có muốn đăng nhập không?",
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
                  name: {
                    type: "string",
                    example: "Internal Server Error",
                  },
                  message: {
                    type: "string",
                    example: "Something went wrong",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/verify-email/{token}": {
    get: {
      summary: "Xác thực email",
      description: "API xác thực email người dùng",
      tags: ["Auth"],
      security: [],
      parameters: [
        {
          in: "path",
          name: "token",
          required: true,
          description: "Token xác thực",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Xác thực email thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Xác thực email thành công!",
                  },
                  user: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "65f0b8d0fbd3a6e9f8e2c9d5",
                      },
                      userName: {
                        type: "string",
                        example: "example@gmail.com",
                      },
                      email: {
                        type: "string",
                        example: "ledinhkhanhquan@gmail.com",
                      },
                      password: {
                        type: "string",
                        example: "123456",
                      },
                      verified: {
                        type: "boolean",
                        example: true,
                      },
                      role: {
                        type: "string",
                        example: "USER",
                      },
                      createdAt: {
                        type: "string",
                        example: "2021-09-08T06:40:48.000Z",
                      },
                      updatedAt: {
                        type: "string",
                        example: "2021-09-08T06:40:48.000Z",
                      },
                      _v: {
                        type: "number",
                        example: 0,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Token không hợp lệ hoặc đã hết hạn",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Token không hợp lệ hoặc đã hết hạn",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User không tồn tại",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User không tồn tại",
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
                  name: {
                    type: "string",
                    example: "Internal Server Error",
                  },
                  message: {
                    type: "string",
                    example: "Something went wrong",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/login": {
    post: {
      summary: "Đăng Nhập",
      description: "API đăng nhập tài khoản",
      tags: ["Auth"],
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "kquan2846@gmail.com",
                },
                password: {
                  type: "string",
                  example: "123456",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Đăng nhập thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Đăng nhập thành công",
                  },
                  accessToken: {
                    type: "string",
                    example:
                      "eyJhbGciOiJ9.eyJpZCI6IjY3ZDIzNDgyN2NiZWIxMTA5ZTdlYzI1NiIsImlhdCI6MTc0MTgyOTQyOCwiZXhwIjoxNzQzMDM5MDI4fQ.J9qMQY1km5Zydyk9ZbmM2ykX2I6gLl-YYF_9LClJ3KI",
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "65f0b8d0fbd3a6e9f8e2c9d5",
                      },
                      userName: {
                        type: "string",
                        example: "Nguyễn Văn A",
                      },
                      phone: {
                        type: "string",
                        example: "0123456789",
                      },
                      email: {
                        type: "string",
                        example: "example@gmail.com",
                      },
                      verified: {
                        type: "boolean",
                        example: true,
                      },
                      role: {
                        type: "string",
                        example: "USER",
                      },
                      createdAt: {
                        type: "string",
                        example: "2021-09-08T06:40:48.000Z",
                      },
                      updatedAt: {
                        type: "string",
                        example: "2021-09-08T06:40:48.000Z",
                      },
                    },
                  },
                },
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
                    example: "Email hoặc mật khẩu không đúng",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User không tồn tại",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User không tồn tại",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Email chưa được xác thực",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Email chưa được xác thực",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/logout": {
    post: {
      summary: "Đăng xuất tài khoản",
      description: "API đăng xuất tài khoản",
      tags: ["Auth"],
      responses: {
        200: {
          description: "Đăng xuất thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Đăng xuất thành công",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User không tồn tại",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User không tồn tại",
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
                  name: {
                    type: "string",
                    example: "Internal Server Error",
                  },
                  message: {
                    type: "string",
                    example: "Something went wrong",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/refresh-token": {
    post: {
      summary: "Lấy access token mới",
      description: "API lấy access token mới",
      tags: ["Auth"],
      responses: {
        200: {
          description: "Lấy access token thành",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Tạo token thành công",
                  },
                  accessToken: {
                    type: "string",
                    example:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDIzNDgyN2NiZWIxMTA5ZTdlYzI1NiIsImlhdCI6MTc0MTgyOTQyOCwiZXhwIjoxNzQzMDM5MDI4fQ.J9qMQY1km5Zydyk9ZbmM2ykX2I6gLl-YYF_9LClJ3KI",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Token không hợp lệ",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Token không hợp lệ",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User không tồn tại",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User không tồn tại",
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
                  name: {
                    type: "string",
                    example: "Internal Server Error",
                  },
                  message: {
                    type: "string",
                    example: "Something went wrong",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/forgot-password": {
    post: {
      summary: "Quên mật khẩu",
      description: "API quên mật khẩu",
      tags: ["Auth"],
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "example@gmail.com",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Tạo mật khẩu mới thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Vui lòng kiểm tra email để lấy mật khẩu mới",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Email chưa được đăng ký",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Email chưa được đăng ký",
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
                  name: {
                    type: "string",
                    example: "Internal Server Error",
                  },
                  message: {
                    type: "string",
                    example: "Something went wrong",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/reset-password": {
    post: {
      summary: "Đặt lại mật khẩu",
      description: "API đặt lại mật khẩu",
      tags: ["Auth"],
      security: [],
      "parameters": [
        {
          "name": "token",
          "in": "query",
          "required": true,
          "schema": {
            "type": "string"
          },
          "description": "Token đặt lại mật khẩu"
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                password: {
                  type: "string",
                  example: "123456",
                },
                confirmPassword: {
                  type: "string",
                  example: "123456",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Đặt lại mật khẩu thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Đặt lại mật khẩu thành công!",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Mật khẩu cũ không đúng",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Mật khẩu cũ không đúng",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User không tồn tại",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User không tồn tại",
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
                  name: {
                    type: "string",
                    example: "Internal Server Error",
                  },
                  message: {
                    type: "string",
                    example: "Something went wrong",
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

module.exports = authSwagger;
