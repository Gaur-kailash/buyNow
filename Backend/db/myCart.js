const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userID : String,
    id : Number,
    itemCount : Number,
    productTitle : String,
    productPrice : Number,
    productImage : String
})

module.exports = mongoose.model("carts",cartSchema);