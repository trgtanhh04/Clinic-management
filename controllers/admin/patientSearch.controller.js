const Patient = require("../../models/patientModel.js");
const Form = require("../../models/medicalFormModel.js");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment");

// [GET] /admin/patient-search?name=<Tên cần tìm>
module.exports.index = async (req, res) => {
    try {
        const name = req.query.name?.trim(); // Lấy tham số "name" từ query

        if (!name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Name query parameter is required."
            });
        }

        // Tìm bệnh nhân theo tên
        const patients = await Patient.find({ fullName: { $regex: name, $options: "i" } });

        if (patients.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "No patients found."
            });
        }

        // Tạo mảng kết quả với dữ liệu triệu chứng và chuẩn đoán
        const results = await Promise.all(
            patients.map(async (patient) => {
                const forms = await Form.find({ patientID: patient._id, deleted: false });
                return forms.map((form) => ({
                    patientName: patient.fullName,
                    examDate: moment(form.createdAt).format("YYYY-MM-DD"), // Định dạng ngày khám
                    symptoms: form.symptoms,
                    diagnosis: form.diagnosis
                }));
            })
        );

        const flatResults = results.flat();

        res.status(StatusCodes.OK).json({
            success: true,
            data: flatResults
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred while searching for patients.",
            error: error.message
        });
    }
};
