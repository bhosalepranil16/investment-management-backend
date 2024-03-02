const express = require("express");

const { Crypto } = require("../models/index");
const { isUser } = require("../middlewares/user");

const router = express.Router();

router.post("/", isUser, async (req, res) => {
  try {
    const { title, value } = req.body;
    const userId = req.activeUser.id;
    const crypto = await Crypto.create({
      title,
      value,
      userId,
    });
    return res.status(201).json(crypto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.get("/", isUser, async (req, res) => {
  try {
    const userId = req.activeUser.id;
    const cryptoes = await Crypto.findAll({ where: { userId } });
    return res.json(cryptoes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.put("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let crypto = await Crypto.findByPk(id);

    if (!crypto) {
      throw new Error("Crypto not found");
    }

    if (crypto.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const { title, value } = req.body;

    crypto.title = title;
    crypto.value = value;
    crypto = await crypto.save();
    return res.json(crypto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.delete("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let crypto = await Crypto.findByPk(id);

    if (!crypto) {
      throw new Error("Crypto not found");
    }

    if (crypto.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await crypto.destroy();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

module.exports = router;
