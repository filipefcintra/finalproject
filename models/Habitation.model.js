const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const HabitationSchema = new Schema({
  title: { type: String, required: true },
  website: { type: String },
  description: { type: String, required: true },
  phone: { type: String },
  photo: { type: String },
  companyEmail: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ["Apartamento", "Casa", "Quarto", "Estudio", "Loja", "Outro"],
  },
  price: { type: Number, required: true },
  room: {
    type: String,
    enum: ["Estudio", "1", "2", "3", "4+"],
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Habitation", HabitationSchema);
