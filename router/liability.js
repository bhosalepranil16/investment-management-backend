const express = require("express");

const { Liability } = require("../models/index");
const { isUser } = require("../middlewares/user");

const router = express.Router();

router.post("/", isUser, async (req, res) => {
  try {
    const { title, value } = req.body;
    const userId = req.activeUser.id;
    const liability = await Liability.create({
      title,
      value,
      userId,
    });
    return res.status(201).json(liability);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.get("/", isUser, async (req, res) => {
  try {
    const userId = req.activeUser.id;
    const liabilities = await Liability.findAll({ where: { userId } });
    return res.json(liabilities);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.put("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let liability = await Liability.findByPk(id);

    if (!liability) {
      throw new Error("Liability not found");
    }

    if (liability.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const { title, value } = req.body;

    liability.title = title;
    liability.value = value;
    liability = await liability.save();
    return res.json(liability);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.delete("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let liability = await Liability.findByPk(id);

    if (!liability) {
      throw new Error("Liability not found");
    }

    if (liability.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await liability.destroy();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

module.exports = router;
