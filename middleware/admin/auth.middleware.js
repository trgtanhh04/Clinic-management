const Account = require("../../models/accountModel")

// Middleware để kiểm tra tính hợp lệ của token
module.exports.requireAuth = async (req, res, next) => {
    // Kiểm tra xem có cookie token không
    if (!req.cookies.token) {
        return res.status(401).json({
            message: "Bạn không có quyền truy cập trang này. Vui lòng đăng nhập."
        });
    }

    try {
        // Kiểm tra token trong cơ sở dữ liệu
        const user = await Account.findOne({ token: req.cookies.token });

        // Nếu không tìm thấy user hoặc token không hợp lệ
        if (!user) {
            return res.status(401).json({
                message: "Bạn không có quyền truy cập trang này. Vui lòng đăng nhập lại."
            });
        }

        // Nếu token hợp lệ, cho phép tiếp tục
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Đã có lỗi xảy ra khi kiểm tra quyền truy cập."
        });
    }
};