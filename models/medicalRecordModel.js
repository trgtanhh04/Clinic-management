const mongoose = require("mongoose");
const diseaseType = require("./diseaseTypeModel");

const medicalRecordSchema = new mongoose.Schema(
  {
    medicalRecordId: Number,
    patientID: String,
    examinationDate: Date,
    Symtoms: String,
    diseaseTypeId: Number,
    deleted: Boolean,
  }
);

const medicalRecord = mongoose.model('medicalRecord', medicalRecordSchema, "medicalRecords");

module.exports = medicalRecord;
