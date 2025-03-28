const userSchema = {
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
            phone: {
                type: "string",
                example: "0123456789"
            },
            avatar: {
                type: "string",
                example: "https://res.cloudinary.com/duykd/image/upload/v1630380241/2021-08-31T09:10:41",
            },
            password: {
                type: "string",
                example: "password"
            },
            verified: {
                type: "boolean",
                example: true
            },
            role: {
                type: "number",
                example: 4
            }
        }

    }
}

module.exports = {userSchema};