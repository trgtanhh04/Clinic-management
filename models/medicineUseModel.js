const mongoose = require("mongoose");

const medicineUseSchema = new mongoose.Schema({
  usageMethod: Number,
  description: String,
  deleted: Boolean,
});

const medicineUse = mongoose.model(
  "medicineUse",
  medicineUseSchema,
  "medicineUses"
);

module.exports = medicineUse;
