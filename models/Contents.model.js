const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const ContentsSchema = new Schema({
  category: {
    type: String,
    enum: ["orgãos", "documentos", "impostos", "estudos", "bancos"],
  },
  country: { type: String, required: true },
  content: [
    new Schema({
      type: {
        type: String,
        enum: ["texto", "imagem", "título", "lista", "link"],
      },
      content: { type: String },
    }),
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Contents", ContentsSchema);
