const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  sex: String,
  phone: String,
  email: String,
  address: String,
  deleted: { type: Boolean, default: false },
  }
  ,
  {
    timestamps: true // Tự động thêm trường createdAt và updatedAt
  }
);

const Patient = mongoose.model("Patient", patientSchema, "patients");

module.exports = Patient;