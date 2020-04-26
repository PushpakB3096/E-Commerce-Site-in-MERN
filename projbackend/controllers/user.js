/* start of user.js controller */

const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    const { _id, firstName, lastName, email, userInfo, privilege, orders } = req.profile;

    return res.json({
        _id: _id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        userInfo: userInfo,
        privilege: privilege,
        orders: orders
    });
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id},        //which user to update
        { $set: req.body },             //update the info obtained from req.body
        { new: true, useFindAndModify: false},      //options
        (err, updatedUser) => {
            if(err || !updatedUser){
                return res.status(400).json({
                    error: "Update failed"
                });
            }
            const { _id, firstName, lastName, email, userInfo, privilege, orders } = updatedUser;   //displaying only the relevant info

            return res.json({
                msg: `User with ID: ${req.profile._id} has been updated`,
                updatedUser: {
                    _id: _id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userInfo: userInfo,
                    privilege: privilege,
                    orders: orders
                }
            });
        }
        );
};

exports.getOrderList = (req, res) => {
    Order.find({ user: req.profile._id }).populate("user", "_id firstName").exec((err, orders) => {
        if(err || !orders){
            return res.status(400).json({
                error: "Request failed"     //TODO: give detailed error message
            });
        }
        return res.json(orders);
    });
};

exports.pushOrderinOrdersList = (req, res, next) => {       //gets the order from UI and pushes the details to the user DB
    let allOrders = [];

    req.body.order.purchases.forEach(product => {
        allOrders.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transactionId: req.body.order.transactionId
        });
    });

    //storing the info in DB
    User.findOneAndUpdate(
        { _id: req.profile._id},
        { $push: { orders: allOrders} },
        { new: true },   //for returning the new and updated user
        (err, user) => {
            if(err || !user){
                return res.status(400).json({
                    error: "Failed to update order list of user"
                });
            }
            next();
        }
    );
};

/* end of user.js controller */