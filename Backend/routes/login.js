const express = require('express');
const router = express.Router();
const user = require("../db/user");
const {body,validationResult} = require('express-validator')


router.post("/login",
[
    body('email').isEmail().withMessage("Enter valid Email"),
    body('password').isLength({min:5}).withMessage("Password must be atleast of 5 words")
]
,async (req,res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.array() });
  }
    let User = await user.findOne({email:req.body.email,password:req.body.password});
    console.log(User);
    if(User==null)
    return res.send({errors:"Enter valid credentials "})
  else{
    return res.send(User);
  }
})

module.exports = router;