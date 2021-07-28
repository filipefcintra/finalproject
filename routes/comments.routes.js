const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

const CommentsModel = require("../models/Comments.model");

router.post(
  "/forum/:id/comments",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;

      // Criando Pergunta

      const newComments = await CommentsModel.create({
        ...req.body,
        userId: req.currentUser._id,
      });

      return res.status(201).json(newComments);
    } catch (err) {
      next(err);
    }
  }
);

//Listar todas as perguntas

router.delete(
  "/forum/:id/comments",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleteComments = await CommentsModel.deleteOne({ _id: id });

      if (deleteComments) {
        return res.status(200).json({});
      }
      return res.status(404).json({ error: "Comentário não encontrado" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
