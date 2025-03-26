const taskSchema = {
    Task: {
        type: "object",
        properties: {
            title: {
                type: "string",
                example: "Tạo API cho hệ thống"
            },
            description: {
                type: "string",
                example: "Tạo API cho hệ thống sử dụng Node.js và Express"
            },
            projectId: {
                type: "string",
                example: "60d4f6d3c2f2a00015f8a3d5"
            },
            assigneeId: {
                type: "array",
                items: {
                    type: "string",
                    example: "60d4f6d3c2f2a00015f8a3d5"
                }
            },
            assignerId: {
                type: "string",
                example: "60d4f6d3c2f2a00015f8a3d5"
            },
            link: {
                type: "string",
                example: "https://example.com"
            },
            startDate: {
                type: "string",
                example: "2021-06-25T00:00:00.000Z"
            },
            status: {
                type: "number",
                example: 1
            },
            priority: {
                type: "number",
                example: 1
            },
            images: {
                type: "string",
                example: "https://example.com/image.jpg"
            },  
            endDate: {   
                type: "string",
                example: "2021-06-25T00:00:00.000Z"
            }
        }
    }
}

export { taskSchema };