const mongoose = require("mongoose");
const Patient = require("../../models/patientModel.js");
const Form = require("../../models/medicalFormModel.js");
const Medicine = require("../../models/medicineModel.js");
const Invoice = require("../../models/invoiceModel.js");
const Regulation = require("../../models/regulationModel.js");
const Disease = require("../../models/diseaseTypeModel.js")
const { StatusCodes } = require("http-status-codes");
const moment = require("moment");


// 0. [GET] admin/regulation-update/general-regulation
module.exports.getRegulation = async (req, res) => {
    try {
        const regulation = await Regulation.findOne({deleted: false})
        res.status(StatusCodes.OK).json({
            message: "Truy van thanh cong",
            data: regulation
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Truy van khong thanh cong"
        })
    }
}

// 1. [POST] admin/regulation-update/general-regulation
module.exports.regulation = async (req, res) => {
    try {
        const { maxPatientsPerDay, examFee } = req.body;

        // Kiểm tra xem bản ghi quy định đã tồn tại chưa
        const existingRegulation = await Regulation.findOne({ deleted: false });

        if (!existingRegulation) {
            // Nếu chưa có bản ghi, tạo mới
            const newRegulation = new Regulation({
                maxPatientsPerDay: maxPatientsPerDay,
                examFee: examFee,
            });
            await newRegulation.save();
            return res.status(StatusCodes.OK).json({
                message: "Quy định được tạo mới thành công.",
            });
        }

        // Nếu đã có bản ghi, cập nhật
        await Regulation.updateOne(
            { _id: existingRegulation._id },
            { maxPatientsPerDay, examFee, updatedAt: Date.now() } // Cập nhật trường updatedAt
        );

        res.status(StatusCodes.OK).json({
            message: "Thay đổi quy định thành công.",
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật quy định:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Đã xảy ra lỗi khi thay đổi quy định.",
        });
    }
};


// 2. [GET] admin/regulation-update/medicine
module.exports.medicine = async (req, res) => {
    try {
        // Lấy danh sách thuốc chưa bị xóa
        const medicines = await Medicine.find({ deleted: false });
        res.status(StatusCodes.OK).json({
            medicines: medicines,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách thuốc:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Không thể lấy danh sách thuốc.",
        });
    }
};

// 3. [GET] admin/regulation-update/medicine/create
module.exports.createMedicine = async (req, res) => {
    res.status(StatusCodes.OK).json({
        message: "Đây là trang tạo thuốc",
    });
};

// 4. [POST] admin/regulation-update/medicine/create
module.exports.createMedicinePost = async (req, res) => {
    try {
        const { medicineName, unit, unitPrice, usageMethod } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!medicineName || !unit || !unitPrice || !usageMethod) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Vui lòng cung cấp đầy đủ thông tin thuốc.",
            });
        }

        // Tạo mới một loại thuốc
        const newMedicine = new Medicine({
            medicineName,
            unit,
            unitPrice,
            usageMethod,
        });

        // Lưu vào cơ sở dữ liệu
        await newMedicine.save();

        res.status(StatusCodes.CREATED).json({
            message: "Tạo thuốc mới thành công.",
            medicine: newMedicine,
        });
    } catch (error) {
        console.error("Lỗi khi tạo thuốc:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Không thể tạo thuốc mới.",
        });
    }
};

// 5. [DELETE] admin/regulation-update/medicine/delete/:id
module.exports.deleteMedicine = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id thuốc từ params

        // Tìm thuốc theo id và cập nhật trường deleted thành true
        const medicine = await Medicine.findByIdAndUpdate(id, { deleted: true });

        // Kiểm tra xem thuốc có tồn tại hay không
        if (!medicine) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Thuốc không tồn tại.",
            });
        }

        res.status(StatusCodes.OK).json({
            message: "Đã xóa thuốc thành công.",
            medicine: medicine,
        });
    } catch (error) {
        console.error("Lỗi khi xóa thuốc:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Đã xảy ra lỗi khi xóa thuốc.",
        });
    }
};


//6.[GET] admin/regulation-update/disease
module.exports.disease = async (req, res) => {
    const diseases = await Disease.find({deleted: false})
    res.status(StatusCodes.OK).json({
        message: "Danh sách bệnh",
        diseases: diseases
    });
};

// 7. [GET] admin/regulation-update/disease/create
module.exports.createDisease = async (req, res) => {
    res.status(StatusCodes.OK).json({
        message: "Đây là trang tạo bệnh",
    });
};

// 8. [POST] admin/regulation-update/disease/create
module.exports.createDiseasePost = async (req, res) => {
    try {
        const { diseaseName, symptoms, medication } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!diseaseName || !symptoms || !medication) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Thiếu thông tin, vui lòng cung cấp đầy đủ tên bệnh, triệu chứng và thuốc.",
            });
        }

        // Tạo mới một bệnh
        const newDisease = new Disease({
            diseaseName,
            symptoms,
            medication
        });

        await newDisease.save();

        res.status(StatusCodes.CREATED).json({
            message: "Bệnh đã được tạo thành công.",
            disease: newDisease, // Trả về thông tin bệnh vừa tạo
        });
    } catch (error) {
        console.error("Lỗi khi tạo bệnh:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Đã xảy ra lỗi khi tạo bệnh.",
        });
    }
};

// 9. [DELETE] admin/regulation-update/disease/delete/:id
module.exports.deleteDisease = async (req, res) => {
    const id = req.params.id;

    try {
        const disease = await Disease.findOneAndUpdate(
            { _id: id }, 
            { deleted: true }
        );

        if (!disease) {
            return res.status(404).json({
                message: "Không tìm thấy bệnh với ID đã cho."
            });
        }

        res.status(200).json({
            message: "Bệnh đã được xóa thành công.",
            disease: disease
        });

    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi khi xóa bệnh.",
            error: error.message
        });
    }
};
