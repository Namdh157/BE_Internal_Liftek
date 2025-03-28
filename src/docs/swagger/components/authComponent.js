const authSchema = {
    User: {
        type: "object",
        properties: {
            userName: {
                type: "string",
                example: "Nguyễn Văn A"
            },
            email: {
                type: "string",
                example: "example@gmail.com"
            },
            image: {
                type: "string",
                example: "https://res.cloudinary.com/duykd/image/upload/v1630380241/2021-08-31T09:10:41",
            },
            phone: {
                type: "string",
                example: "0123456789"
            },
            password: {
                type: "string",
                example: "123456"
            },
            verified: {
                type: "boolean",
                example: false
            },
            role: {
                type: "number",
                example: 4
            }
        }

    }
}

module.exports = {authSchema};