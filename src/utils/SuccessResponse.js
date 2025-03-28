class SuccessResponse {
    constructor(data = {}, statusCode = 200, message = "success", total = 0, page = 1, limit = 10, filter = {}) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
        this.total = total;
        this.page = page;
        this.totalPage = Math.ceil(total / limit);
        this.limit = limit;
        this.filter = filter;
    }

    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            data: this.data
        });
    }

    sends(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            total: this.total,
            page: this.page,
            limit: this.limit,
            totalPage: this.totalPage,
            data: this.data,
            filter: this.filter
        });
    }
}

module.exports = SuccessResponse;