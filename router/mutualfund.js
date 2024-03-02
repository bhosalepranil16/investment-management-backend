const express = require("express");

const { MutualFund } = require("../models/index");
const { isUser } = require("../middlewares/user");

const router = express.Router();

router.post("/", isUser, async (req, res) => {
  try {
    const {
      title,
      nav,
      quantity,
      smallCapPercentage,
      midCapPercentage,
      largeCapPercentage,
      cashPercentage,
    } = req.body;
    const userId = req.activeUser.id;

    const mutualFund = await MutualFund.create({
      title,
      nav,
      quantity,
      smallCapPercentage,
      midCapPercentage,
      largeCapPercentage,
      cashPercentage,
      userId,
    });

    return res.status(201).json(mutualFund);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.get("/", isUser, async (req, res) => {
  try {
    const userId = req.activeUser.id;
    const mutualFunds = await MutualFund.findAll({ where: { userId } });
    return res.json(mutualFunds);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.put("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let mutualFund = await MutualFund.findByPk(id);

    if (!mutualFund) {
      throw new Error("Mutual Fund not found");
    }

    if (mutualFund.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const {
      title,
      nav,
      quantity,
      smallCapPercentage,
      midCapPercentage,
      largeCapPercentage,
      cashPercentage,
    } = req.body;

    mutualFund.title = title;
    mutualFund.nav = nav;
    mutualFund.quantity = quantity;
    mutualFund.smallCapPercentage = smallCapPercentage;
    mutualFund.midCapPercentage = midCapPercentage;
    mutualFund.largeCapPercentage = largeCapPercentage;
    mutualFund.cashPercentage = cashPercentage;

    mutualFund = await mutualFund.save();
    return res.json(mutualFund);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.delete("/:id", isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.activeUser.id;
    let mutualFund = await MutualFund.findByPk(id);

    if (!mutualFund) {
      throw new Error("mutual fund not found");
    }

    if (mutualFund.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await mutualFund.destroy();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

module.exports = router;
