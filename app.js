const express = require('express');
const app = express();
const userRouter=require("./routes/user.routes")
const indexRouter=require("./routes/index.routes")

const dotenv= require("dotenv");
const connectToDB = require("./config/db");
const cookieParser = require("cookie-parser");

// new add-on
const passport = require('passport');
const session = require('express-session');

require('./config/passport'); // Import the passport configuration

// 
connectToDB();
dotenv.config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine","ejs");

app.use("/user",userRouter);
app.use("/",indexRouter);

//  new add-on
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false
}));
console.log('Session middleware loaded');
app.use(passport.initialize());
console.log('Passport initialize middleware loaded');
app.use(passport.session());
console.log('Passport session middleware loaded');

// 


app.listen(process.env.PORT, () => {
    console.log('Server running on http://localhost:3000');
});