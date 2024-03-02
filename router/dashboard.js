const express = require("express");

const {
  Gold,
  Debt,
  Crypto,
  Liability,
  IndianStock,
  MutualFund,
} = require("../models/index");
const { isUser } = require("../middlewares/user");

const router = express.Router();

router.get("/all", isUser, async (req, res) => {
  try {
    const userId = req.activeUser.id;

    const goldValue = await Gold.sum("value", { where: { userId } });
    const debtValue = await Debt.sum("value", { where: { userId } });
    const cryptoValue = await Crypto.sum("value", { where: { userId } });
    const liabilityValue = await Liability.sum("value", { where: { userId } });

    const stocks = await IndianStock.findAll({ where: { userId } });
    const mutualFunds = await MutualFund.findAll({ where: { userId } });

    let stockValue = 0;
    let mutualFundValue = 0;

    stocks?.map((stock) => {
      stockValue += stock.price * stock.quantity;
    });

    mutualFunds?.map((mutualFund) => {
      mutualFundValue += mutualFund.nav * mutualFund.quantity;
    });

    return res
      .status(200)
      .json({
        goldValue,
        debtValue,
        cryptoValue,
        stockValue,
        mutualFundValue,
        liabilityValue,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

module.exports = router;
