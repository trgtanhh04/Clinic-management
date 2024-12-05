const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  medicineName: String,
  unit: String,
  unitPrice: Number,
  usageMethod: { type: Array, default: [] },
  deleted: Boolean,
});

const medicine = mongoose.model("medicine", medicineSchema, "medicines");

module.exports = medicine;
