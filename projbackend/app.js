/* start of app.js */

require('dotenv').config();   //loading the 'dotenv' package to read config from '.env' file

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");

//importing routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

const PORT = process.env.SERVERPORT;

const app = express();

//common middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//establishing DB connection
mongoose.connect(process.env.DATABASEURL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("CONNECTION TO THE DB ESTABLISHED");
});

//using the routes
app.use("/api", authRoute);
app.use("/api", userRoute);

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}...`);
});

/* end of app.js */