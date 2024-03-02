const express = require("express");

const { Debt } = require("../models/index");
const { isUser } = require("../middlewares/user");

const router = express.Router();

router.post("/", isUser, async (req, res) => {
  try {
    const { title, type, value } = req.body;
    const userId = req.activeUser.id;
    const debt = await Debt.create({
      title,
      type,
      value,
      userId,
    });
    return res.status(201).json(debt);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.get("/", isUser, async (req, res) => {
  try {
    const userId = req.activeUser.id;
    const debt = await Debt.findAll({ where: { userId } });
    return res.json(debt);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.put("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let debt = await Debt.findByPk(id);

    if (!debt) {
      throw new Error("Debt not found");
    }

    if (debt.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const { title, type, value } = req.body;

    debt.title = title;
    debt.type = type;
    debt.value = value;
    debt = await debt.save();
    return res.json(debt);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.delete("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let debt = await Debt.findByPk(id);

    if (!debt) {
      throw new Error("Debt not found");
    }

    if (debt.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await debt.destroy();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

module.exports = router;
