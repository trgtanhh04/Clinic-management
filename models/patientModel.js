const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  fullName: String,
  yearOfBirth: Number,
  sex: String,
  phone: String,
  address: String,
  examDate: String,
  deleted: { type: Boolean, default: false },
  }
  ,
  {
    timestamps: true // Tự động thêm trường createdAt và updatedAt
  }
);

const Patient = mongoose.model("Patient", patientSchema, "patients");

module.exports = Patient;