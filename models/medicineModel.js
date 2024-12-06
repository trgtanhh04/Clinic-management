const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    medicineName: String,
    unit: String,
    unitPrice: Number,  
    usageMethod: String,
    deleted: { type: Boolean, default: false }                     
}, { timestamps: true });

const Medicine = mongoose.model("Medicine", medicineSchema, "medicines");

module.exports = Medicine;