const mongoose = require("mongoose");

const medicineUseSchema = new mongoose.Schema({
  usageMethod: Number,
  description: String,
  deleted: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: Date,
  updatedAt: Date,
});

const medicineUse = mongoose.model(
  "medicineUse",
  medicineUseSchema,
  "medicineUses"
);

module.exports = medicineUse;
