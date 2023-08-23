const mongoose = require('mongoose');
const profileSchema = mongoose.Schema({
    id : String,
    FirstName: String,
    LastName : String,
    Address1 : String,
    Address2 : String,
    City : String,
    State : String ,
    Mobile: Number,
    Telephone : Number,
    Pincode : Number,
    Gender : String
})

module.exports = mongoose.model("profiles",profileSchema);