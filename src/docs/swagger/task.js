const taskSwagger = {
    "/tasks/create-task" : {
        post: {
            summary: "Tạo nhiệm vụ mới",
            description: "API tạo nhiệm vụ mới",
            tags: ["Task"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Task",
                        },
                    },
                }
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
            }
        }
    },
    "/tasks/edit-task/{id}" : {

        put: {
            summary: "chỉnh sửa nhiệm vụ",
            description: "API chỉnh sửa nhiệm vụ",
            tags: ["Task"],
            parameters: [
                {
                    in: "path",
                    name: "id",
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
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Task",
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
        }
    },
    
    "/tasks": {
        get: {
            summary: 'Lấy danh sách tất cả công việc',
            description: 'Trả về danh sách các công việc trong hệ thống',
            tags: ['Task'],
           
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
                }
             
               
            },
        }
        
    },    
    "/tasks/{taskId}/status": {
        put: {
            summary: 'Cập nhật trạng thái công việc',
            description: 'Trả về  công việc đã thay đổi trạng thái trong hệ thống',
            tags: ['Task'],
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
                             type: "string",
                            example: {status: "completed" }
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
                }
            }
        }
    },
    "/tasks/{taskId}/add-user": {
          post: {
            summary: 'Thêm người dùng vào vấn đề',
            description: 'Trả về công việc đã thêm người dùng trong hệ thống',
            tags: ['Task'],
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
                             type: "string",
                            example: {userId: ["60d4f6d3c2f2a00015f8a3d6"] }
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Thêm người dùng vào vấn đề thành công",
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
                // 404: {
                //     description: "Lỗi phía server",
                //     content: {
                //         "application/json": {
                //             schema: {
                //                 type: "object",
                //                 properties: {
                //                     message: {
                //                         type: "string",
                //                         example: "Không thấy task hợp lệ",
                //                     },
                //                 },
                //             },
                //         },
                //     },
                // },
                // 500: {
                //     description: "Lỗi phía server",
                //     content: {
                //         "application/json": {
                //             schema: {
                //                 type: "object",
                //                 properties: {
                //                     message: {
                //                         type: "string",
                //                         example: "Internal server error",
                //                     },
                //                 },
                //             },
                //         },
                //     },
                // }
            }
        }
    },
    "/tasks/search": {
          post: {
            summary: 'Tìm kiếm công việc',
            description: 'Trả về công việc có thông tin tìm kiếm tương thích',
            tags: ['Task'],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                             type: "string",
                                example:{tiltle: "Fix login bug",
                                        assigneeId: "65f123abc123abcd12345678",
                                        assignerId: "65f456def456defg45678901",
                                        startDate: "2024-03-10",
                                        endDate: "2024-03-15",
                                }
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
                }
            }
        }
    },
    "/tasks/getTaskByProject/{id}": {
    get: {
      summary: "Lấy danh sách nhiệm vụ theo project",
      description: "API trả về danh sách các nhiệm vụ theo project ID",
      tags: ["Task"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID của Project",
          schema: {
            type: "string",
            example: "60d4f6d3c2f2a00015f8a3d5",
          },
        },
      ],
      responses: {
        200: {
          description: "Lấy danh sách nhiệm vụ thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "ok!",
                  },
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Task",
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "ID không hợp lệ",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "ID không hợp lệ",
                  },
                  data: {
                    type: "null",
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
        
     
}

export default taskSwagger;