const { PERMISSIONS } = require("../constants");

exports.authorize = (action) => {
    return (req, res, next) => {
        try {
            const { role } = req.user;
            const permissions = PERMISSIONS[role];
            if (!permissions.includes(action)) {
                return res.status(403).json({
                    message: "Ban khong co quyen truy cap"
                });
            }
            next();
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}