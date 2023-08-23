const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DB_URL;

const connectionOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}
mongoose.connect(dbUrl,connectionOptions).then(()=>{
    console.info("Connected to database");
}).catch((err)=>console.warn(err))
