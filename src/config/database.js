const mongoose = require("mongoose");

const connect = async () => {
  const mongoURI = process.env.MONGODB_URL || "mongodb://localhost/GroceryApp";

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

module.exports = connect;

// await mongoose.connect('mongodb://localhost/GroceryApp');
// console.log(process.env.MONGODB_URL);
// await mongoose.connect('mongodb://mongo:27017/GroceryApp') || await mongoose.connect('mongodb://localhost/GroceryApp');
//  await mongoose.connect('mongodb://192.168.1.100:27017/GroceryApp');

// console.log("Connected to database");
