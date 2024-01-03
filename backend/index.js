const express = require("express"); 
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
const dotenv = require("dotenv").config();
var bodyParser = require('body-parser')

const User = require("./models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

connectDb();
const app = express();  
const port = process.env.PORT || 5000; 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json());
app.use(cors());

app.use("/api/users",require("./routes/userRoutes"))

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on ${port} port`);
}); 

