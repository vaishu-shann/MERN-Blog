
const bcrypt = require("bcrypt");
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler");
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log("req.body", req.body)

    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ username });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }
    const userDoc = await User.create({
        username,
        password: bcrypt.hashSync(password, salt),
    });
    console.log("user created", userDoc);
    res.json(userDoc);
    if (userDoc) {
        res.status(201).json({ _id: userDoc.id, username: userDoc.username });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }

});


const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log("req.body", req.body)
    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({ user:{username, id: userDoc._id }}, process.env.ACCESS_TOKEN_SECERT, { expiresIn: "45m" }, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                token
            });
        });
    } else {
        res.status(400).json('username or password is not valid');
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });


module.exports = { registerUser, loginUser,currentUser };