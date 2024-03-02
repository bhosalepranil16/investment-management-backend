const express = require("express");

const { Gold } = require("../models/index");
const { isUser } = require("../middlewares/user");

const router = express.Router();

router.post("/", isUser, async (req, res) => {
  try {
    const { title, type, value } = req.body;
    const userId = req.activeUser.id;
    const gold = await Gold.create({
      title,
      type,
      value,
      userId,
    });
    return res.status(201).json(gold);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.get("/", isUser, async (req, res) => {
  try {
    const userId = req.activeUser.id;
    const gold = await Gold.findAll({ where: { userId } });
    return res.json(gold);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.put("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let gold = await Gold.findByPk(id);

    if (!gold) {
      throw new Error("Gold not found");
    }

    if (gold.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const { title, type, value } = req.body;

    gold.title = title;
    gold.type = type;
    gold.value = value;
    gold = await gold.save();
    return res.json(gold);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.delete("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let gold = await Gold.findByPk(id);

    if (!gold) {
      throw new Error("Gold not found");
    }

    if (gold.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await gold.destroy();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

module.exports = router;
