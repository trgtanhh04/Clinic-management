const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  patientID: String,
  position: Number,
  symptoms: String, 
  diagnosis: String, // Chuẩn đoán
  medicines: [
    {
        medicineID: String,  // Liên kết với thuốc
        quantity: Number, // Số lượng thuốc
        description: String, // Mô tả thuốc
    },
  ],
  deleted: { type: Boolean, default: false }, 
 },{ timestamps: true }// Tự động thêm trường createdAt và updatedAt
);

const Form = mongoose.model("Form", formSchema, "medicalForm");

module.exports = Form;

