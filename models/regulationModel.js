const mongoose = require("mongoose");

const regulationSchema = new mongoose.Schema({
  maxPatientsPerDay: Number,
  numberOfMedicines: Number,
  defaultExaminationFee: Number,
  numberOfUsageMethod: Number,
  deleted: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: Date,
  updatedAt: Date,
});

const regulation = mongoose.model(
  "regulation",
  regulationSchema,
  "regulations"
);

module.exports = regulation;
