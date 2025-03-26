const ErrorMiddleware = {
    errorHandle: (err, req, res) => {
        console.error(err);

        let statusCode = err.statusCode || 500;
        let message = err.message || "Internal Server Error";

        // xử lý lỗi mongoose (ID không hợp lệ, trùng lặp, ...)
        if (err.name === "CastError") {
           statusCode = 400;
           message = `Invalid ${err.path}: ${err.value}`;
        }

        // xử lý lỗi duplicate key (trùng dữ liệu)
        if(err.code === 11000) {
            statusCode = 400;
            message = "Duppicate fied value entered";
        }

        // xử lý validate từ mongoose
        if(err.name === "ValidationError") {
            statusCode = 400;
            message = Object.values(err.errors).map(val => val.message).join(", ");
        }

        res.status(statusCode).json({
            success: false,
            message,
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    },

    notFound: (req, res,) => {
        res.status(404).json({
            success: false,
            message: `Not Found - ${req.originalUrl}`,
        });
    }
}

export default ErrorMiddleware;