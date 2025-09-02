const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const { body, validationResult } = require('express-validator');

router.get("/register", (req, res) => {
    res.render("register")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login",
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 5 }),
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

        const { username, password } = req.body; 

        const user = await userModel.findOne({username:username}); //find user by username.

        if (!user) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password); //compare password with hashed password.

        if (!isMatch) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }

        const token = jwt.sign({ id: user._id , email: user.email ,username:user.username}, process.env.JWT_SECRET) ;//generate token using jwt.
        res.cookie("token", token); // <name>,value of token
        // res.send("Login Successfull") 
        res.redirect("/home")
    })

router.post("/register",
    body("email").trim().isEmail().isLength({ min: 13 }),
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 5 }), 
    async (req, res) => {

        console.log(req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

        const { username, email, password } = req.body;  //variable name and key name should same.
        hashPassword = await bcrypt.hash(password, 10); //hashing password using bcrypt.

        const newUser = await userModel.create({      // Enter data into user model.

            username: username,
            email: email,
            password: hashPassword

        })
        // res.json(newUser);
        res.redirect("/") //redirect to about page.
    })

    router.get("/logout", (req, res) => {
        res.clearCookie("token"); //clear cookie using name of cookie.
        res.redirect("/") ;//redirect to about page.
    });

module.exports = router;
