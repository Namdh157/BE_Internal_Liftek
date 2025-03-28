const projectSchema = {
  Project: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "Dự án phát triển hệ thống CRM",
      },
      code: {
        type: "number",
        example: 12345678,
      },
      description: {
        type: "string",
        example: "Dự án phát triển hệ thống CRM hỗ trợ quản lý khách hàng",
      },
      status: {
        type: "number",
        example: 0,
      },
      managerId: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "67d23acb23793aac51e64dc5",
          },
        },
      },
      members: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "67d3946b9e89d674a5872f3f",
            },
          },
        },
        default: [
          { _id: "67d3946b9e89d674a5872f3f" },
          { _id: "67d917e97f40a50f71b9b1f1" },
        ],
      },
      priority: {
        type: "number",
        example: 0,
      },
    },
  },
};

module.exports = {projectSchema};
