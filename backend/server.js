require("dotenv").config();
const app = require("express");
const connectDB = require("./src/db/db");

connectDB();

app.listen(3000, () => {
  console.log("server is listen at port 3000.");
});
