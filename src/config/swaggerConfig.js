const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../docs/swagger/index.js");


// Cấu hình Swagger
const options = {
    definition: swaggerDocs,
    apis: [],
};

// Khởi tạo Swagger
const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};