const express = require("express");
const newProfile = require("../db/profileModel");
const { body, validationResult } = require('express-validator');
const profileRouter = express.Router();

// Define your middleware for parsing JSON
profileRouter.use(express.json());
// Custom validation middleware to check for empty fields
const checkEmptyFields = (fields) => {
    return fields.map(field => body(field).notEmpty().withMessage(`${field} cannot be empty`));
};

profileRouter.post("/profile",
checkEmptyFields(['Address1', 'Address2', 'City','FirstName','Gender','LastName','Mobile','Pincode','State','Telephone']),
body('Mobile').isLength({ min: 10 }).withMessage('Phone number must be at least 10 numbers'),
body('Telephone').isLength({ min: 10 }).withMessage('Telephone number must be at least 10 numbers')
,async (req,res)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    let profile = await new newProfile(req.body);
    profile = await profile.save();
    res.send(profile);
})
profileRouter.post("/getProfile",async (req,res)=>{
    let profile = await newProfile.findOne(req.body);
    console.log(profile);
    if(profile==null){
        console.log("Returning null")
        return res.send({empty:"no data"})
    }
    res.send(profile)
})

module.exports = profileRouter;