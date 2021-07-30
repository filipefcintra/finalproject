const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const ContentsSchema = new Schema({
  category: {
    type: String,
    enum: ["orgãos", "documentos", "impostos", "estudos", "bancos"],
    required: true,
  },
  country: { type: String, required: true },
  content: { type: String },
  conteudo: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Contents", ContentsSchema);
