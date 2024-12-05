const mongoose = require("mongoose");

const diseaseTypeSchema = new mongoose.Schema({
  diseaseTypeId: String,
  diseaseName: String,
  deleted: Boolean,
});

const diseaseType = mongoose.model(
  "diseaseType",
  diseaseTypeSchema,
  "diseaseTypes"
);

module.exports = diseaseType;
