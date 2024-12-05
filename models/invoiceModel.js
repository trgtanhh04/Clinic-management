const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  medicalRecordID: { type: Array, default: [] },
  totalAmount: Number,
  examinationFee: Number,
  medicineCost: Number,
  deleted: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: Date,
  updatedAt: Date,
});

const invoice = mongoose.model("invoice", invoiceSchema, "invoices");

module.exports = invoice;
