const mongoose = require("mongoose");
const generate = require("../helper/generate.js")
const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(20)
    },
    phone: String,
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true // Tự động thêm trường createdAt và updatedAt
  }
);

const Account = mongoose.model('Account', accountSchema, "accounts");

module.exports = Account;
