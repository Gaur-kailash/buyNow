const express = require('express');
const cartRouter = express.Router();
const cart = require("../db/myCart");

cartRouter.post("/cart",async (req,res)=>{
    let userId = req.body.id;
    let findItem = await cart.findOne({id:userId});
    if(findItem){
        let updateItem = await cart.updateOne({id:userId},req.body);
        if(updateItem.modifiedCount===1){
            console.log("Item modified");
            res.send(updateItem);
        }
    }else{
    let cartItem = new cart(req.body);
    let result = await cartItem.save();
    res.send(result);}
})
cartRouter.get("/cart", async (req,res)=>{
    let result = await cart.find(req.body);
    console.log(result);
    res.send(result);
})

module.exports = cartRouter;