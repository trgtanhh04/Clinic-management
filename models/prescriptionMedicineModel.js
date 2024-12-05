const mongoose = require("mongoose");

const prescriptionMedicineSchema = new mongoose.Schema({
  medicalRecordID: String,
  medicineID: String,
  quantity: Number,
  deleted: Boolean,
});

const prescriptionMedicine = mongoose.model(
  "prescriptionMedicine",
  prescriptionMedicineSchema,
  "prescriptionMedicines"
);

module.exports = prescriptionMedicine;
