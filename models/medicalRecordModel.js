const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  medicalRecordID: String,
  patientID: String,
  examinationDate: Date,
  symtoms: String,
  diseaseTypeId: Number,
  deleted: Boolean,
});

const medicalRecord = mongoose.model(
  "medicalRecord",
  medicalRecordSchema,
  "medicalRecords"
);

module.exports = medicalRecord;
