const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const ForumModel = require("../models/Forum.model");

router.post(
  "/forum",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;

      // Criando Pergunta

      const newQuestion = await ForumModel.create({
        ...req.body,
        userId: req.currentUser._id,
      });

      return res.status(201).json(newQuestion);
    } catch (err) {
      next(err);
    }
  }
);

//Listar todas as perguntas

router.get(
  "/forum",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const foruns = await ForumModel.find();

      return res.status(200).json(foruns);
    } catch (err) {
      next(err);
    }
  }
);

// Listar uma pergunta especifica

router.get(
  "/forum/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const forum = await ForumModel.findOne({ _id: id }).populate("User");

      if (forum) {
        return res.status(200).json(forum);
      }
      return res.status(400).json({ error: "Pergunta não encontrada." });
    } catch (err) {
      next(err);
    }
  }
);

// Atualizar uma pergunta

router.put(
  "/forum/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedQuestion = await ForumModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true }
      );

      if (updatedQuestion) {
        return res.status(200).json(updatedQuestion);
      }
      return res.status(404).json({ error: "Pergunta não encontrada." });
    } catch (err) {
      next(err);
    }
  }
);

// Deletar uma pergunta

router.delete(
  "/forum/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleteQuestion = await ForumModel.deleteOne({ _id: id });

      if (deleteQuestion) {
        return res.status(200).json({});
      }
      return res.status(404).json({ error: "Pergunta não encontrada" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
