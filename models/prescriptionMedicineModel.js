const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    medicalFormID: String,  // liên kết với phiếu khám bệnh
    diagnosis: String, // Chuẩn đoán
    medicines: [
        {
            medicineID: String,  // Liên kết với thuốc
            quantity: Number, // Số lượng thuốc
            description: String, // Mô tả thuốc
        },
    ],
    deleted: { type: Boolean, default: false },  // Đánh dấu kê đơn bị xóa
}, { timestamps: true });

const Prescription = mongoose.model("Prescription", prescriptionSchema, "prescriptionMedicines");

module.exports = Prescription;
