const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientID: String,
  patientName: String,
  birthYear: Number,
  gender: String,
  address: String,
  image: String,
  deleted: Boolean,
});

const Patient = mongoose.model("Patient", patientSchema, "patients");

module.exports = Patient;
