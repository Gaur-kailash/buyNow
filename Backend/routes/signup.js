const express = require("express");
const user = require("../db/user");
const router = express.Router();
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
let otps = {};

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const transporter = nodemailer.createTransport({
  // host : "smtp.gmail.com",
  // port :"587",
  // secure:false,
  service: "gmail",
  auth: {
    user: "9412576598kanha@gmail.com",
    pass: "zrryzkvydmufaofo",
  },
});

router.post(
  "/mail",
  [body("email").isEmail().withMessage("Enter valid Email")],
  async (req, res) => {
    let userMAil = req.body.email;
    let otp;
    console.log(userMAil);
    const errors = validationResult(req);
    if (await user.findOne({ email: userMAil })) {
      let msg = { msg: "User Already Exists" };
      errors.errors.push(msg);
      return res.status(400).json({ errors: errors.array() });
    }
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    otp = generateOTP();
    otps[userMAil] = otp;
    const mailOptions = {
      from: "9412576598kanha@gmail.com",
      to: req.body.email,
      subject: "Verification Mail from BuyNow",
      text: `This is a OTP to verify your mail for BUYNOW . OTP is ${otp}`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send({ email: "Sent succusfully" });
      }
    });
    console.log(otps[userMAil], "for mail ", userMAil);
    console.log(otps);
  }
);

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").isEmail().withMessage("Enter valid Email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast of 5 words"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let userMail = req.body.email;
    console.log(otps);
    if (!errors.isEmpty() || req.body.otp != otps[userMail]) {
      if (req.body.otp != otps[userMail]) {
        let msg = { msg: "Enter correct OTP" };
        errors.errors.push(msg);
      }
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(otps[userMail], "for registration", userMail);
    let User = new user(req.body);
    let result = await User.save();
    res.send(result);
    delete otps[userMail];
    const mailOptions = {
      from: "9412576598kanha@gmail.com",
      to: req.body.email,
      subject: "Registered Succesfully",
      text: `This mail is used to inform you that ,
      Your Account is Register for BuyNow is successful,
      Thankyou 
      Team BUYNOW
      `,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send({ email: "Sent succusfully" });
      }
    });
    console.log(otps, "After Registration");
  }
);

module.exports = router;
