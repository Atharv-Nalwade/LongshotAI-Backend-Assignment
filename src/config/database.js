const mongoose = require("mongoose");

 const connect = async () =>{
    await mongoose.connect('mongodb://localhost/GroceryApp');
    console.log("Connected to database");
}

module.exports = connect;
