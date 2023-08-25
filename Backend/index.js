const express = require('express');
const cors = require('cors');
const signup = require('./routes/signup');
const login = require('./routes/login');
const cart = require('./routes/addToCart');
const removeFromCart = require('./routes/removeFromCart');
const profile = require("./routes/profile");
const path = require("path");
require('./db/config')
const app = express();
app.use(express.json());
app.use(cors());


app.use('/',signup);
app.use('/',login);
app.use('/',cart);
app.use('/',removeFromCart);
app.use('/',profile);

const __dirname1= path.resolve();
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname1,"/frontend/build")));
    app.get("*",(req,res)=>res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
    );
}
else{
app.get("/",(req,res)=>{
    res.send("API runnug");
});
}
console.log("Server started");
app.listen(process.env.PORT);