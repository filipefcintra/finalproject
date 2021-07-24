const express = require("express");
const router = express.Router();

const UserModel = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const HabitationModel = require("../models/Habitation.model");

router.post(
  "/moradia",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;

      // Criando Anuncio

      const newPost = await HabitationModel.create({
        ...req.body,
        userId: req.currentUser._id,
      });

      return res.status(201).json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

//Listar todos os anuncios

router.get(
  "/moradia",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const habitations = await HabitationModel.find();

      return res.status(200).json(habitations);
    } catch (err) {
      next(err);
    }
  }
);

// Listar um anuncio especifico

router.get(
  "/moradia/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Checar esse populate
      const habitation = await HabitationModel.findOne({ _id: id }).populate(
        "User"
      );

      if (habitation) {
        return res.status(200).json(habitation);
      }
      return res.status(400).json({ error: "Anuncio nao encontrado" });
    } catch (err) {
      next(err);
    }
  }
);

// Atualizar um anuncio

router.put(
  "/moradia/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedHabitation = await HabitationModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true }
      );

      if (updatedHabitation) {
        return res.status(200).json(updatedHabitation);
      }
      return res.status(404).json({ error: "Anuncio nao encontrado." });
    } catch (err) {
      next(err);
    }
  }
);

// Deletar anuncio

router.delete(
  "/moradia/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleteHabitation = await HabitationModel.deleteOne({ _id: id });

      if (deleteHabitation) {
        return res.status(200).json({});
      }
      return res.status(404).json({ error: "Anuncio nao encontrado." });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
