const Patient = require("../../models/patientModel.js")
const Form = require("../../models/medicalFormModel.js")
const Prescription = require("../../models/prescriptionMedicineModel.js")
const { StatusCodes } = require('http-status-codes'); 

//1. [GET] admin/patient-search
module.exports.index = async (req, res) => {
    const { name } = req.query; // Lấy tên từ query string
    try {
        // Tìm bệnh nhân có tên trùng khớp (hoặc gần đúng)
        const patients = await Patient.find({ fullName: { $regex: name, $options: "i" } });
        
        res.status(200).json({ success: true, data: patients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
}
    