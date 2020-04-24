require('dotenv').config();   //loading the 'dotenv' package to read config from '.env' file

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.SERVERPORT;

mongoose.connect(process.env.DATABASEURL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("CONNECTION TO THE DB ESTABLISHED");
});

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}...`);
});