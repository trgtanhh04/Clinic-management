const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  patientID: String,
  examinationDate: Date,
  symtoms: String,
  diseaseTypeId: { type: Array, default: [] },
  deleted: Boolean,
});

const medicalRecord = mongoose.model(
  "medicalRecord",
  medicalRecordSchema,
  "medicalRecords"
);

module.exports = medicalRecord;
