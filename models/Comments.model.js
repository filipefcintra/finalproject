const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const CommentsSchema = new Schema({
  description: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  country: { type: String, required: true },
});

module.exports = model("Comments", CommentsSchema);
