const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientName: String,
  birthYear: Number,
  gender: String,
  address: String,
  image: String,
  deleted: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: Date,
  updatedAt: Date,
});

const Patient = mongoose.model("Patient", patientSchema, "patients");

module.exports = Patient;
