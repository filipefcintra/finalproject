const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String },
  pictureUrl: { type: String, trim: true },
  tags: {
    type: String,
    enum: [
      "saúde",
      "impostos",
      "estudos",
      "bancos",
      "moradia",
      "empregos",
      "negócios",
      "doações",
      "vistos",
      "dicas",
    ],
    required: true,
  },
  answersId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Post", PostSchema);
