const commentSchema = {
    Comment: {
        type: "object",
        properties: {
            taskId: {
                type: "string",
                example: "60d4f6d3c2f2a00015f8a3d5"
            },
            userId: {
                type: "string",
                example: "60d4f6d3c2f2a00015f8a3d5"
            },
            content: {
                type: "string",
                example: "Này là tính năng không phải bug :v"
            },
            createdAt: {
                type: "string",
                example: "2021-06-25T07:00:00.000Z"
            },
            updatedAt: {
                type: "string",
                example: "2021-06-25T07:00:00.000Z"
            }
        }
    }
} 

module.exports = commentSchema;