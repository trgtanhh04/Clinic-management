const mongoose = require("mongoose");

const diseaseTypeSchema = new mongoose.Schema({
    diseaseName: String,
    symptoms: String,
    medication: String,
    deleted: { type: Boolean, default: false },
    }
    ,
    {
        timestamps: true // Tự động thêm trường createdAt và updatedAt
    }
);

const Disease = mongoose.model("Disease", diseaseTypeSchema, "diseaseTypes");

module.exports = Disease;