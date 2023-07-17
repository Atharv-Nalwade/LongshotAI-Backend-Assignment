const express = require("express");
const bodyParser = require("body-parser");

const apiRoutes = require("./routes/index.js");
const connectToDatabase = require("./config/database.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(3000, async () => {
  await connectToDatabase();
  console.log("Server is listening on port 3000");
});
