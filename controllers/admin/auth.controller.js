const { StatusCodes } = require('http-status-codes'); 
const Account = require("../../models/accountModel.js")

//1. [GET] admin/auth/login
module.exports.login = async (req, res) => {
    // Kiểm tra xem cookie có token không
    if (req.cookies.token) {
        return res.status(StatusCodes.OK).json({
            message: "Bạn đã đăng nhập.",
        });
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Bạn chưa đăng nhập. Vui lòng đăng nhập.",
        });
    }
};

// 2. [POST] admin/auth/login
module.exports.loginPost = async (req, res) => {
    const { email, password } = req.body;

    const user = await Account.findOne({
        email: email,
        deleted: false,
    });

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "Tài khoản không tồn tại hoặc đã bị xóa.",
        });
    }

    if (password !== user.password) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Mật khẩu không chính xác.",
        });
    }

    // Tạo cookie token
    res.cookie("token", user.token, {
        maxAge: 24 * 60 * 60 * 1000, // Thời gian hết hạn của cookie (1 ngày)
    });

    return res.status(StatusCodes.OK).json({
        message: "Đăng nhập thành công.",
        user: {
            fullName: user.fullName,
            email: user.email,
        },
    });
};

//3. [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie('token');
    return res.status(StatusCodes.OK).json({
        message: 'Đăng xuất thành công',
    });
};
