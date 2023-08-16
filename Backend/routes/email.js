const express = require('express');
const nodemailer = require('nodemailer');
const emailRouter = express.Router();
// const PORT = 3000 ; 

// Generate a random 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

const transporter = nodemailer.createTransport({
  // host : "smtp.gmail.com",
  // port :"587",
  // secure:false,
  service:"gmail",
  auth:{
    user : "9412576598kanha@gmail.com",
    pass : "zrryzkvydmufaofo"
  }
})

const otp = generateOTP();
emailRouter.post("/mail",async (req,res)=>{
  const mailOptions = {
    from : "9412576598kanha@gmail.com",
    to : req.body.email ,
    subject : "Verification Mail from BuyNow",
    text: `This is a OTP to verify your mail in BUYNOW . OTP is ${otp}`
  }
  transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
      res.send({error:err});
    }
    else{
      res.send({email:"Sent succusfully"});
    }
  })
})

module.exports = {
  emailRouter,otp
}