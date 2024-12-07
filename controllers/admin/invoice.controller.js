const mongoose = require("mongoose");
const Patient = require("../../models/patientModel.js");
const Form = require("../../models/medicalFormModel.js");
const Medicine = require("../../models/medicineModel.js");
const Invoice = require("../../models/invoiceModel.js")
const { StatusCodes } = require("http-status-codes");

const moment = require("moment");


// 1. [GET] admin/invoice
module.exports.index = async (req, res) => {
    try {
        // Tìm tất cả các medicalForm có thuốc và chưa bị xóa
        const forms = await Form.find({ deleted: false, "medicines.0": { $exists: true } });

        // Lấy tất cả patientID từ các form, loại bỏ null và trùng lặp
        const patientIDs = [...new Set(forms.map(form => form.patientID).filter(id => id))];

        // Truy vấn thông tin đầy đủ của tất cả bệnh nhân có patientID tương ứng
        const patients = await Patient.find({ _id: { $in: patientIDs } });

        res.status(StatusCodes.OK).json({
            message: "Danh sách bệnh nhân có sử dụng thuốc",
            data: patients
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Lỗi khi lấy danh sách bệnh nhân",
            error: err
        });
    }
};


//Lập hóa đơn
const calculateInvoiceDetails = async (idPatient) => {
    const medicalForm = await Form.findOne({ patientID: idPatient, deleted: false }).populate("patientID");

    if (!medicalForm) {
        throw new Error("Không tìm thấy phiếu khám cho bệnh nhân này.");
    }

    // Kiểm tra xem phiếu khám đã có trong hóa đơn chưa
    const existingInvoice = await Invoice.findOne({ medicalFormID: medicalForm._id });

    if (existingInvoice) {
        throw new Error("Hóa đơn đã được lập cho phiếu khám này.");
    }

    let medicineFee = 0;
    const medicinesInfo = [];

    for (const item of medicalForm.medicines) {
        const medicine = await Medicine.findOne({ _id: item.medicineID, deleted: false });
        if (!medicine) {
            throw new Error(`Không tìm thấy thông tin thuốc với ID: ${item.medicineID}`);
        }

        const totalPrice = item.quantity * medicine.unitPrice;
        medicineFee += totalPrice;

        medicinesInfo.push({
            medicineName: medicine.medicineName,
            quantity: item.quantity,
            unitPrice: medicine.unitPrice,
            totalPrice: totalPrice
        });
    }

    const examFee = 30; // Tiền khám cố định
    const totalFee = examFee + medicineFee;
    const patient = await Patient.findOne({_id: idPatient, deleted: false})

    return {
        patientName: patient.fullName,
        patientPhone: patient.phone,
        diagnosis: medicalForm.diagnosis,
        examFee: examFee,
        medicineFee: Math.round(medicineFee * 100) / 100,
        totalFee: Math.round(totalFee * 100) / 100,
        medicines: medicinesInfo,
        medicalFormID: medicalForm._id
    };
};


// 2. [GET] admin/invoice/create/:id
module.exports.invoice = async (req, res) => {
    const idPatient = req.params.id;

    try {
        const invoiceDetails = await calculateInvoiceDetails(idPatient);
        res.status(StatusCodes.OK).json({
            message: "Thông tin hóa đơn được tạo thành công",
            data: invoiceDetails
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Lỗi khi lấy thông tin hóa đơn",
            error: err.message
        });
    }
};


//3. [POST] admin/invoice/create/:id
module.exports.invoicePost = async (req, res) => {
    const idPatient = req.params.id;

    try {
        const invoiceDetails = await calculateInvoiceDetails(idPatient);

        // Tạo hóa đơn
        const newInvoice = new Invoice({
            medicalFormID: invoiceDetails.medicalFormID,
            examFee: invoiceDetails.examFee,
            medicineFee: invoiceDetails.medicineFee,
            totalFee: invoiceDetails.totalFee,
            paymentMethod: req.body.paymentMethod || "cash"
        });

        const invoice = await newInvoice.save();

        res.status(StatusCodes.CREATED).json({
            message: "Hóa đơn được tạo thành công",
            data: invoice
        });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Lỗi khi tạo hóa đơn",
            error: err.message
        });
    }
};
