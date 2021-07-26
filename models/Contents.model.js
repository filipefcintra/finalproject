const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const ContentsSchema = new Schema({
  category: {
    type: String,
    enum: ["orgãos", "documentos", "imposto", "estudos", "bancos"],
  },
  country: { type: String, required: true },
  content: [
    new Schema({
      type: {
        type: String,
        enum: ["texto", "imagem", "titulo", "lista", "link"],
      },
      content: { type: String },
    }),
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Contents", ContentsSchema);
