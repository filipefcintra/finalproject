const express = require("express");
const router = express.Router();

const ContentsModel = require("../models/Contents.model");

router.post("/conteudo", async (req, res, next) => {
  try {
    const newDoc = await ContentsModel.create({ ...req.body });

    return res.status(201).json(newDoc);
  } catch (err) {
    next(err);
  }
});

router.get("/:country/conteudo", async (req, res, nex) => {
  try {
    const allDoc = await ContentsModel.findOne({
      country: req.params.country,
    });

    return res.status(200).json(allDoc);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
