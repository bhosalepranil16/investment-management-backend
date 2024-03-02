const express = require("express");

const { IndianStock } = require("../models/index");
const { isUser } = require("../middlewares/user");

const router = express.Router();

router.post("/", isUser, async (req, res) => {
  try {
    const { title, type, quantity, price } = req.body;
    const userId = req.activeUser.id;
    const stock = await IndianStock.create({
      title,
      type,
      quantity,
      price,
      userId,
    });
    return res.status(201).json(stock);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.get("/", isUser, async (req, res) => {
  try {
    const userId = req.activeUser.id;
    const stocks = await IndianStock.findAll({ where: { userId } });
    return res.json(stocks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.put("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let stock = await IndianStock.findByPk(id);

    if (!stock) {
      throw new Error("Indian Stock not found");
    }

    if (stock.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const { title, type, quantity, price } = req.body;

    stock.title = title;
    stock.type = type;
    stock.quantity = quantity;
    stock.price = price;

    stock = await stock.save();
    return res.json(stock);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.delete("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let stock = await IndianStock.findByPk(id);

    if (!stock) {
      throw new Error("Gold not found");
    }

    if (stock.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await stock.destroy();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

module.exports = router;
