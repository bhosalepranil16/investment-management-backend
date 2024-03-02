const express = require("express");
const twillioClient = require("twilio");
const jwt = require("jsonwebtoken");

const { OTP, User } = require("../models/index");
const CONSTANTS = require("../util/constants");
const { generateOTP } = require("../util/index");

const router = express.Router();

router.post("/sendOTP", async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const isValidPhoneNumber = new RegExp(
      CONSTANTS.REGULAR_EXPRESSIONS.PHONE_NUMBER
    ).test(phoneNumber);

    if (isValidPhoneNumber) {
      const messageClient = twillioClient(
        process.env.TWILLIO_ACCOUNT_SID,
        process.env.TWILLIO_AUTH_TOKEN
      );
      const generatedOTP = generateOTP();

      await messageClient.messages.create({
        from: process.env.TWILLIO_PHONE_NUMBER,
        to: phoneNumber,
        body: `Welcome to Investment Management. Your OTP is ${generatedOTP}`,
      });

      const [otp, isCreated] = await OTP.findOrCreate({
        where: { phoneNumber: phoneNumber },
        defaults: { otp: generatedOTP },
      });

      if (!isCreated) {
        otp.otp = generatedOTP;
        await otp.save();
      }

      return res.sendStatus(200);
    } else {
      throw new Error("Enter valid mobile number.");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

router.post("/verifyOTP", async (req, res) => {
  try {
    const { name, email, phoneNumber, dateOfBirth, otp } = req.body;
    const userOTP = await OTP.findOne({ where: { phoneNumber, otp } });

    if (!userOTP) {
      throw new Error("Invalid OTP.");
    }

    await userOTP.destroy();
    const token = jwt.sign({ mobileNumber: phoneNumber }, process.env.SECRET);
    const [user, isCreated] = await User.findOrCreate({
      where: { mobileNumber: phoneNumber },
      defaults: {
        name,
        email,
        dateOfBirth,
        token,
      },
    });
    if (!isCreated) {
      user.token = token;
      await user.save();
    }
    return res.json({
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      dateOfBirth: user.dateOfBirth,
      token: user.token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.toString() });
  }
});

module.exports = router;
