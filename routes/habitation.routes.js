const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const HabitationModel = require("../models/Habitation.model");
const uploader = require("../config/cloudinary.config");

router.post(
  "/:country/moradia",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;

      // Criando Anuncio

      const newPost = await HabitationModel.create({
        ...req.body,
        userId: req.currentUser._id,
        country: req.params.country,
      });
      console.log(req.body);
      return res.status(201).json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

//Listar todos os anuncios

router.get(
  "/:country/moradia",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const habitations = await HabitationModel.find({
        country: req.params.country,
      });

      return res.status(200).json(habitations);
    } catch (err) {
      next(err);
    }
  }
);

// Listar um anuncio especifico

router.get(
  "/:country/moradia/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const habitation = await HabitationModel.findOne({ _id: id }).populate(
        "User"
      );

      if (habitation) {
        return res.status(200).json(habitation);
      }
      return res.status(400).json({ error: "Anúncio não encontrado." });
    } catch (err) {
      next(err);
    }
  }
);

// Atualizar um anuncio

router.put(
  "/:country/moradia/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const updateHabitation = await HabitationModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true }
      );

      if (updateHabitation) {
        return res.status(200).json(updateHabitation);
      }
      return res.status(404).json({ error: "Anúncio não encontrado." });
    } catch (err) {
      next(err);
    }
  }
);

// Deletar anuncio

router.delete(
  "/:country/moradia/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleteHabitation = await HabitationModel.deleteOne({ _id: id });

      if (deleteHabitation) {
        return res.status(200).json({});
      }
      return res.status(404).json({ error: "Anúncio não encontrado." });
    } catch (err) {
      next(err);
    }
  }
);
router.post("/upload", uploader.single("profilePicture"), (req, res) => {
  if (!req.file) {
    return res
      .status(500)
      .json({ error: "Não foi possível completar o upload do arquivo" });
  }

  console.log(req.file);

  return res.status(201).json({ url: req.file.path });
});

module.exports = router;
