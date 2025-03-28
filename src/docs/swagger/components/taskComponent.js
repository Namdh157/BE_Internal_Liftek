const taskSchema = {
  Task: {
    type: "object",
    properties: {
      title: {
        type: "string",
        example: "Tạo API cho hệ thống",
      },
      description: {
        type: "string",
        example: "Tạo API cho hệ thống sử dụng Node.js và Express",
      },
      projectId: {
        type: "string",
        example: "67d8dd65edc970e80f2ed0a4",
      },
      assigneeId: {
        type: "array",
        items: {
          type: "string",
          example: "67d3f05b2c209d64023d0d9d",
        },
      },
      assignerId: {
        type: "string",
        example: "67d9160e6b6c2f5362dd5112",
      },
      link: {
        type: "string",
        example: "https://example.com",
      },
      startDate: {
        type: "string",
        example: "2021-06-25T00:00:00.000Z",
      },
      status: {
        type: "number",
        example: 1,
      },
      priority: {
        type: "number",
        example: 1,
      },
      images: {
        type: "string",
        example: "https://example.com/image.jpg",
      },
      endDate: {
        type: "string",
        example: "2021-06-25T00:00:00.000Z",
      },
    },
  },
};

module.exports = {taskSchema};
