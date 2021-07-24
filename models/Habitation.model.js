const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const HabitationSchema = new Schema({
  title: { type: String, required: true },
  website: { type: String },
  description: { type: String, required: true },
  phone: { type: String },
  photo: { type: String },
  type: {
    type: String,
    enum: ["Apartamento", "Casa", "Quarto", "Estudio", "Loja", "Outro"],
  },
  price: { tipo: Number, required: true },
  room: { type: String, enum: ["Studio", "1", "2", "3", "4+"] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Habitation", HabitationSchema);
