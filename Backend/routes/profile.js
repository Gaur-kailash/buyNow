const express = require("express");
const newProfile = require("../db/profileModel");
const profileRouter = express.Router();

profileRouter.post("/profile",async (req,res)=>{
    profile = await new newProfile(req.body);
    profile = await profile.save();
    res.send(profile);
})
profileRouter.post("/getProfile",async (req,res)=>{
    profile = await newProfile.findOne(req.body);
    res.send(profile);
})

module.exports = profileRouter;