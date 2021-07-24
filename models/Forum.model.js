const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  //   Pensar em quais tags terao no site
  tags: { type: String, enum: ["definir tags"] },
  //   Ver se isso ta certo
  answers: { type: mongoose.Schema.Types.ObjectId, ref: "Comments" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const CommentsSchema = new Schema({
  description: { type: String, required: true },
  // Ver se isso ta certo
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Post", PostSchema);
module.exports = model("Comments", CommentsSchema);
