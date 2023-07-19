const mongoose = require("mongoose");

 const connect = async () =>{
    await mongoose.connect('mongodb://localhost/GroceryApp');
    // await mongoose.connect('mongodb://mongo:27017/GroceryApp');
    // await mongoose.connect('mongodb://192.168.1.100:27017/GroceryApp');

    console.log("Connected to database");
}

module.exports = connect;
