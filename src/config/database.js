const mongoose = require("mongoose");

 const connect = async () =>{
    await mongoose.connect('mongodb://mongo:27017/GroceryApp');
    console.log("Connected to database");
}

module.exports = connect;
