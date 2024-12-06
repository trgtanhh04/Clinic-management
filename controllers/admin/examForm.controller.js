const Patient = require("../../models/patientModel.js")
const Form = require("../../models/medicalFormModel.js")
const Medicine = require("../../models/medicineModel.js")
const Prescription = require("../../models/prescriptionMedicineModel.js")
const systemConfig = require("../../config/system.js")
const { StatusCodes } = require('http-status-codes'); 


//-------------------------------------------------------------------------
// 1. [GET] /admin/exam-form
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


//2. [GET] /admin/exam-form/create/:id
module.exports.createForm = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const patient = await Patient.findOne(find);

        if (!patient) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Patient not found."
            });
        }

        res.status(StatusCodes.OK).json({
            message: "Provide patient data via POST to create a new form.",
            data: patient
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred while fetching patient data.",
            error: error.message
        });
    }
};


// 3. [POST] /admin/exam-form/create/:id
module.exports.createFormPost = async (req, res) => {
    try {
        // Lấy ID bệnh nhân từ params
        req.body.patientID = req.params.id;
        const { position } = req.body;

        // Kiểm tra xem bệnh nhân đã có form hay chưa
        const existingForm = await Form.findOne({ patientID: req.params.id, deleted: false });
        if (existingForm) {
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: "This patient already has a form."
            });
        }

        // Kiểm tra xem position đã được sử dụng chưa
        const positionExists = await Form.findOne({ position, deleted: false });
        if (positionExists) {
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: `Position ${position} is already assigned to another patient.`
            });
        }

        // Tạo mới form khám bệnh
        const newForm = new Form(req.body);
        const savedForm = await newForm.save();

        // Phản hồi thành công
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Form created successfully.",
            data: savedForm
        });
    } catch (error) {
        // Phản hồi lỗi
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred while creating the form.",
            error: error.message
        });
    }
};


///----------------------------------------------------------
//4. [GET] /admin/exam-form/prescription/:id (id ở đây là id của phiếu khám bệnh)
module.exports.createPrescription = async (req, res) => {
    try {
        const record = await Form.findOne({ _id: req.params.id, deleted: false }); //Phiếu khám bệnh đã lập
        if (!record) {
            return res.status(404).json({ message: "Record not found" });
        }

        const medicines = await Medicine.find({ deleted: false }); //Các loại thuốc
        res.status(200).json({ record, medicines });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//5. [POST] /admin/exam-form/prescription/:id
module.exports.createPrescriptionPost = async (req, res) => {
    try {
        const prescriptionData = {
            medicalFormID: req.params.id, // ID phiếu khám bệnh
            diagnosis: req.body.diagnosis, //Chiệu trứng
            medicines: req.body.medicines, // Array thuốc
        };

        const newPrescription = new Prescription(prescriptionData);
        await newPrescription.save();

        res.status(201).json({ message: "Prescription created successfully", data: newPrescription });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
