const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const CommentsSchema = new Schema({
  description: { type: String, required: true },
  // Ver se isso ta certo
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Comments", CommentsSchema);
