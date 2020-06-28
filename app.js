/* start of app.js */

require("dotenv").config(); //loading the 'dotenv' package to read config from '.env' file

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//importing routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");
//uncomment the below line if you want to use Stripe as your payment gateway
//const stripeRoute = require("./routes/stripepayment");

const app = express();

//common middlewares
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//establishing DB connection
mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("CONNECTION TO THE DB ESTABLISHED");
  });

//using the routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);
app.use("/api", paymentRoute);
//uncomment the below line if you want to use Stripe as your payment gateway
//app.use("/api", stripeRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 9999, () => {
  console.log(`Server listening to port ${PORT}...`);
});

/* end of app.js */
