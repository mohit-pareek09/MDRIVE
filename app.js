const express = require('express');
const app = express();
const userRouter=require("./routes/user.routes")
const indexRouter=require("./routes/index.routes")

const dotenv= require("dotenv");
const connectToDB = require("./config/db");
const cookieParser = require("cookie-parser");

connectToDB();
dotenv.config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine","ejs");

app.use("/user",userRouter);
app.use("/",indexRouter);

app.listen(process.env.PORT, () => {
    console.log('Server running on http://localhost:3000');
});