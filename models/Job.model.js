const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const JobSchema = new Schema({
  title: { type: String, required: true },
  Url: { type: String },
  description: { type: String, required: true },
  phone: { type: String, trim: true },
  company: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Job", JobSchema);
