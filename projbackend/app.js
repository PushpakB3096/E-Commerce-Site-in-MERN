require('dotenv').config();   //loading the 'dotenv' package to read config from '.env' file

const mongoose = require('mongoose');
const express = require('express');

const app = express();

const PORT = 9999;

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