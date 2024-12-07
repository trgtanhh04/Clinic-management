const mongoose = require("mongoose");

const regulationSchema = new mongoose.Schema({
  maxPatientsPerDay: Number,
  examFee: Number,
  deleted: { type: Boolean, default: false },
  }
  ,
  {
    timestamps: true // Tự động thêm trường createdAt và updatedAt
  }
);

const Regulation = mongoose.model("Regulation", regulationSchema, "regulations");

module.exports = Regulation;