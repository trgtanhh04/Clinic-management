const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    medicineID: String,
    medicineName: String,
    unit: String,
    unitPrice: Number,
    usageMethod: Number,
    deleted: Boolean,
  }
);

const medicine = mongoose.model('medicine', medicineSchema, "medicines");

module.exports = medicine;
