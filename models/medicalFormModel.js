const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  patientID: String,
  fullName: String,
  phone: String,
  position: Number,
  symptoms: String,
  doctor: String,
  room: String,
  deleted: { type: Boolean, default: false },
  }
  ,
  {
    timestamps: true // Tự động thêm trường createdAt và updatedAt
  }
);

const Form = mongoose.model("Form", formSchema, "medicalForm");

module.exports = Form;
