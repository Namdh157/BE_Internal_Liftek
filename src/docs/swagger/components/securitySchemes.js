const securitySchemes = {
    BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
    }
}
module.exports = {securitySchemes};