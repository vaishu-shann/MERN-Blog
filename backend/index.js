const express = require("express"); 
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
const dotenv = require("dotenv").config();
var bodyParser = require('body-parser')
var fileUpload = require("express-fileupload")


const User = require("./models/userModel");
const Post = require("./models/postModel")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

connectDb();
const app = express();  
const port = process.env.PORT || 5000; 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());
// app.use(express.json());
app.use(cors());

app.use("/api/users",require("./routes/userRoutes"));

app.use('/api/posts',require("./routes/postRoute") );

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on ${port} port`);
}); 

