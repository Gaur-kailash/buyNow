const express = require('express');
const removeRouter = express.Router();
const cartItem = require("../db/myCart");

removeRouter.post("/remove",async (req,res)=>{
    let userId = req.body.id;
    let result = await cartItem.deleteOne({id:userId});
    if(result.deletedCount>=1){
        res.send(result);
    }
    else{
        console.log("Not Deleted");
    }
})

module.exports = removeRouter;