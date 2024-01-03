const express = require("express"); 
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express(); 

const port = process.env.PORT || 5000; 
app.use(express.json());

app.listen(port, () => {
  console.log(`server running on ${port} port`);
}); 

