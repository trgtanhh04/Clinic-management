const Patient = require("../../models/patientModel.js")
const systemConfig = require("../../config/system.js")
const { StatusCodes } = require('http-status-codes'); 
const Regulation = require("../../models/regulationModel.js")

//-------------------------------------------------------------------------
// 1. [GET] /admin/exam-list
module.exports.index = async (req, res) => {
    try {
        let find = {
            deleted: false
        };

        const patients = await Patient.find(find);
        res.status(StatusCodes.OK).json({
            success: true,
            data: patients
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred while retrieving patients.",
            error: error.message
        });
    }
};

//-------------------------------------------------------------------------
// 2. [GET] /admin/exam-list/create
module.exports.create = async (req, res) => {
    res.status(StatusCodes.OK).json({ 
        message: "Provide patient data via POST to create a new record."
    });
};

// 3. [POST] /admin/exam-list/create
module.exports.createPost = async (req, res) => {
    try {
        const { fullName, yearOfBirth, sex, phone, address } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!fullName || !phone || !yearOfBirth || !sex || !address) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Thiếu các trường bắt buộc: fullName, email, phone, age, sex, hoặc address."
            });
        }

        // Lấy thời gian bắt đầu và kết thúc của ngày hiện tại
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(startOfDay.getDate() + 1);

        // Đếm số bệnh nhân đã được tạo trong ngày
        const patientCountToday = await Patient.countDocuments({
            createdAt: { $gte: startOfDay, $lt: endOfDay },
            deleted: false
        });

        //Lây thông tin quy định
        const regulation = await Regulation.findOne();

        if (patientCountToday >= regulation.maxPatientsPerDay) {
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: "Đã đạt giới hạn 40 bệnh nhân trong ngày."
            });
        }

        // Tạo mới bệnh nhân
        const newPatient = new Patient(req.body); // Dùng req.body để tạo bệnh nhân
        const savedPatient = await newPatient.save();

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Tạo bệnh nhân thành công.",
            data: savedPatient
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Có lỗi xảy ra khi tạo bệnh nhân.",
            error: error.message
        });
    }
};

//-------------------------------------------------------------------------
//4. [DELETD] /admin/exam-list/delete/:id
module.exports.deletePatient = async (req, res) => {
    const idPatient = req.params.id;

    try {
        // Kiểm tra xem bệnh nhân có tồn tại không
        const patient = await Patient.findById(idPatient);
        if (!patient) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Patient not found."
            });
        }

        // Xóa mềm trong database
        await Patient.updateOne({ _id: idPatient }, { deleted: true });

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Patient deleted successfully."
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred while deleting the patient.",
            error: error.message
        });
    }
};


//-------------------------------------------------------------------------
//5.[GET] admin/exam-list/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            _id: req.params.id,
            deleted: false
        };

        const record = await Patient.findOne(find);

        if (!record) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Patient not found or has been deleted."
            });
        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: record
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred while retrieving the patient.",
            error: error.message
        });
    }
};

//6.[PATCH] admin/exam-list/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra nếu bệnh nhân tồn tại
        const patient = await Patient.findById(id);
        if (!patient || patient.deleted) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Patient not found or has been deleted."
            });
        }

        // Cập nhật thông tin
        const updateResult = await Patient.updateOne({ _id: id }, req.body);

        if (updateResult.nModified === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "No changes were made to the patient record."
            });
        }

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Patient updated successfully."
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred while updating the patient.",
            error: error.message
        });
    }
};
