const Patient = require("../../models/patientModel.js")
const Form = require("../../models/medicalFormModel.js")
const Medicine = require("../../models/medicineModel.js")
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

        const patient = await Patient.findOne(find);//Lấy ra thông tin bệnh nhân

        if (!patient) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Patient not found."
            });
        }

        const medicines = await Medicine.find({ deleted: false }); //Các loại thuốc
        if(!medicines){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Medicines not found."
            });
        }


        res.status(StatusCodes.OK).json({
            message: "Provide patient data via POST to create a new form.",
            patient: patient,
            medicines: medicines
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
        const { position, symptoms, diagnosis, medicines } = req.body;

        // Kiểm tra xem bệnh nhân đã có form hay chưa
        // const existingForm = await Form.findOne({ patientID: req.params.id, deleted: false });
        // if (existingForm) {
        //     return res.status(StatusCodes.CONFLICT).json({
        //         success: false,
        //         message: "This patient already has a form."
        //     });
        // }

        // Kiểm tra xem position đã được sử dụng chưa
        // const positionExists = await Form.findOne({ position, deleted: false });
        // if (positionExists) {
        //     return res.status(StatusCodes.CONFLICT).json({
        //         success: false,
        //         message: `Position ${position} is already assigned to another patient.`
        //     });
        // }

        if (!position || !symptoms || !diagnosis || !Array.isArray(medicines)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Missing required fields: position, symptoms, diagnosis, or medicines."
            });
        }

        for (let i = 0; i < medicines.length; i++) {
            const medicine = medicines[i];
            if (!medicine.medicineID || !medicine.quantity) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: `Medicine at index ${i} is missing required fields: medicineID or quantity.`
                });
            }
        }

        const newForm = new Form({
            patientID: req.params.id, 
            position, 
            symptoms, 
            diagnosis, 
            medicines, 
        });

        const savedForm = await newForm.save();

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Form created successfully.",
            data: savedForm
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred while creating the form.",
            error: error.message
        });
    }
};
