const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://gaur_Kailash:%40%40kanhagaur%40%40@cluster0.gjqutug.mongodb.net/Ecom?retryWrites=true&w=majority';

const connectionOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}
mongoose.connect(dbUrl,connectionOptions).then(()=>{
    console.info("Connected to database");
}).catch((err)=>console.warn(err))
