const express = require('express');
const cors = require('cors');
const signup = require('./routes/signup');
const login = require('./routes/login');
const cart = require('./routes/addToCart');
const removeFromCart = require('./routes/removeFromCart');
const profile = require("./routes/profile");
require('./db/config')
const app = express();
app.use(express.json());
app.use(cors());


app.use('/',signup);
app.use('/',login);
app.use('/',cart);
app.use('/',removeFromCart);
app.use('/',profile);

console.log("Server started");
app.listen(5000);