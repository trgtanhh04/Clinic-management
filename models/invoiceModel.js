const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    medicalFormID: String, // ID phiếu khám
    examFee: Number, // Tiền khám
    medicineFee: Number, // Tiền thuốc
    totalFee: Number, // Tổng tiền
    paymentMethod: String, // Hình thức thanh toán
  },
  { timestamps: true } // Thêm createdAt và updatedAt
);

const Invoice = mongoose.model("Invoice", invoiceSchema, "invoices");

module.exports = Invoice;
