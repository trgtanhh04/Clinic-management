const mongoose = require("mongoose");

const diseaseTypeSchema = new mongoose.Schema({
  diseaseName: String,
  deleted: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: Date,
  updatedAt: Date,
});

const diseaseType = mongoose.model(
  "diseaseType",
  diseaseTypeSchema,
  "diseaseTypes"
);

module.exports = diseaseType;
