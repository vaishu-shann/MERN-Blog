const express = require("express"); 
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
const User = require("./models/userModel");
const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
connectDb();
const app = express();  
const port = process.env.PORT || 5000; 
app.use(express.json());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));

app.use("/api/users",require("./routes/userRoutes"))



app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on ${port} port`);
}); 

