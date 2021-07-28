const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const CommentsModel = require("../models/Comments.model");
const ForumModel = require("../models/Forum.model");

router.post(
  "/forum/:id/comments",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      // Criando comentário

      const newComments = await CommentsModel.create({
        ...req.body,
        postId: req.params.id,
        userId: req.currentUser._id,
      });

      await ForumModel.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { answersId: newComments._id } }
      );
      return res.status(201).json(newComments);
    } catch (err) {
      next(err);
    }
  }
);

// Apagar um comentário

router.delete(
  "/forum/:id/comments",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      console.log(req.body.commentId);
      const { id } = req.params;

      const commentsOne = await CommentsModel.findOne({
        _id: id,
      });

      const deletionComments = await CommentsModel.deleteOne({
        _id: id,
      });

      if (deletionComments.n > 0) {
        const updateForum = await ForumModel.findOneAndUpdate(
          { _id: commentsOne.postId },
          { $pull: { answersId: id } },
          { new: true }
        );
        if (updateForum) {
          return res.status(200).json({});
        }
      }

      return res.status(404).json({ error: "Comentário não encontrado" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
