const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const HabitationSchema = new Schema({
  title: { type: String, required: true },
  website: { type: String },
  description: { type: String, required: true },
  phone: { type: String },
  //photo??
  photo: { type: String },
  companyEmail: { type: String, required: true, trim: true, lowercase: true },
  type: {
    type: String,
    enum: ["Apartamento", "Casa", "Quarto", "Estúdio", "Loja", "Outro"],
    required: true,
  },
  price: { type: Number, required: true },
  room: {
    type: String,
    enum: ["Estúdio", "1", "2", "3", "4+"],
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  country: { type: String, required: true },
});

module.exports = model("Habitation", HabitationSchema);
