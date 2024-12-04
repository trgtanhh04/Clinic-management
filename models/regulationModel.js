const mongoose = require("mongoose");

const regulationSchema = new mongoose.Schema(
  {
    maxPatientsPerDay: Number,
    numberOfMedicines: Number,
    defaultExaminationFee: Number,
    numberOfUsageMethod: Number,
    deleted: Boolean,
  }
);

const regulation = mongoose.model('regulation', regulationSchema, "regulations");

module.exports = regulation;
