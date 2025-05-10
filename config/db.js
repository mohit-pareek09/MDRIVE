require('dotenv').config();
const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to database");   
})
}

module.exports = connectToDB ; 