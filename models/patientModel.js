const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String, 
    age: Number,
    sex: String, 
    address: String,
    deleted: Boolean,
  }
);

const Patient = mongoose.model('Patient', patientSchema, "patient");

module.exports = Patient;
