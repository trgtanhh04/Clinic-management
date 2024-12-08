const Patient = require("../../models/patientModel.js")
const Form = require("../../models/medicalFormModel.js")
const Medicine = require("../../models/medicineModel.js")
const systemConfig = require("../../config/system.js")
const { StatusCodes } = require('http-status-codes'); 
const Account = require("../../models/accountModel.js")

//1. [GET] admin/account
module.exports.index = async(req, res ) =>{
    res.status(StatusCodes.OK).json({
        message: "Đang là trang tài khoản"
    })
}

//2. [POST] admin/account/create
module.exports.createPost = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body;

        // Kiểm tra xem email đã tồn tại chưa
        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "Email đã được sử dụng",
            });
        }

        const newAccount = new Account({
            fullName,
            email,
            password,
            phone,
        });

        await newAccount.save();

        res.status(StatusCodes.CREATED).json({
            message: "Tạo tài khoản thành công",
            account: newAccount, 
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Đã xảy ra lỗi trong quá trình tạo tài khoản",
        });
    }
};


// 3. [GET] admin/account/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;

    try {
        const account = await Account.findOne({ _id: id });
        if (!account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Không tìm thấy tài khoản",
            });
        }

        res.status(StatusCodes.OK).json({ account });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Đã xảy ra lỗi khi tìm tài khoản",
        });
    }
};

// 4. [PATCH] admin/account/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const { fullName, email, oldPassword, newPassword, phone } = req.body;

    try {
        // Tìm tài khoản hiện tại
        const account = await Account.findOne({ _id: id });
        if (!account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Không tìm thấy tài khoản",
            });
        }

        // Kiểm tra email trùng lặp (ngoại trừ tài khoản hiện tại)
        const existingAccount = await Account.findOne({ email, _id: { $ne: id } });
        if (existingAccount) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "Email đã được sử dụng bởi tài khoản khác",
            });
        }

        // Kiểm tra mật khẩu cũ và xử lý mật khẩu mới
        if (oldPassword && newPassword) {
            if (account.password !== oldPassword) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Mật khẩu cũ không chính xác",
                });
            }

            // Cập nhật mật khẩu mới
            req.body.password = newPassword;
        } else if (oldPassword || newPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Vui lòng cung cấp cả mật khẩu cũ và mật khẩu mới để thay đổi mật khẩu",
            });
        }

        // Cập nhật thông tin tài khoản
        const updateResult = await Account.updateOne({ _id: id }, req.body);
        if (updateResult.modifiedCount === 0) {
            return res.status(StatusCodes.NOT_MODIFIED).json({
                message: "Không có thay đổi nào được thực hiện",
            });
        }

        res.status(StatusCodes.OK).json({
            message: "Cập nhật tài khoản thành công",
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Đã xảy ra lỗi trong quá trình cập nhật tài khoản",
        });
    }
};


// [DELETE] admin/account/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        // Kiểm tra xem tài khoản có tồn tại không
        const account = await Account.findOne({ _id: id });
        if (!account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Không tìm thấy tài khoản",
            });
        }

        // Đánh dấu tài khoản là đã bị xóa (soft delete)
        const updateResult = await Account.updateOne({ _id: id }, { deleted: true });
        if (updateResult.modifiedCount === 0) {
            return res.status(StatusCodes.NOT_MODIFIED).json({
                message: "Không có thay đổi nào được thực hiện",
            });
        }

        res.status(StatusCodes.OK).json({
            message: "Tài khoản đã được đánh dấu là đã xóa",
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Đã xảy ra lỗi khi xóa tài khoản",
        });
    }
};
