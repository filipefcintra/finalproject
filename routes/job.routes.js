const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const JobModel = require("../models/Job.model");

router.post(
  "/emprego",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;

      // Criando Anuncio

      const newJob = await JobModel.create({
        ...req.body,
        userId: req.currentUser._id,
      });

      return res.status(201).json(newJob);
    } catch (err) {
      next(err);
    }
  }
);

//Listar todos os anuncios

router.get(
  "/emprego",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const empregos = await JobModel.find();

      return res.status(200).json(empregos);
    } catch (err) {
      next(err);
    }
  }
);

// Listar um anuncio especifico

router.get(
  "/emprego/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Checar esse populate
      const emprego = await JobModel.findOne({ _id: id }).populate("User");

      if (emprego) {
        return res.status(200).json(emprego);
      }
      return res.status(400).json({ error: "Anúncio não encontrado." });
    } catch (err) {
      next(err);
    }
  }
);

// Atualizar um anuncio

router.put(
  "/emprego/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedJob = await JobModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true }
      );

      if (updatedJob) {
        return res.status(200).json(updatedJob);
      }
      return res.status(404).json({ error: "Anúncio não encontrado." });
    } catch (err) {
      next(err);
    }
  }
);

// Deletar anuncio

router.delete(
  "/emprego/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleteJob = await JobModel.deleteOne({ _id: id });

      if (this.deleteJob) {
        return res.status(200).json({});
      }
      return res.status(404).json({ error: "Anúncio não encontrado." });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
