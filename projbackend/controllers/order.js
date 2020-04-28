/* start of order.js controller*/
const Order = require("../models/order");
const ProductInCart = require("../models/productincart");

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name cost")
    .exec((err, order) => {
        if(err || !order){      //TODO: display a proper error message
            return res.status(400).json({
                error: "An error occured while fetching the order"
            });
        }
        req.order = order;
        next();
    });
};

exports.getAllOrder = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, allOrders) => {
      if (err || !allOrders) {      //TODO: give proper error messages
        return res.status(400).json({
          error: "No orders found",
        });
      }
      return res.json(allOrders);
    });
};

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;

    const newOrder = new Order(req.body.order);

    newOrder.save((err, savedOrder) => {
        if(err || !savedOrder){
            return res.status(400).json({
                error: "An error occured while saving the order to the DB"
            });
        }
        return res.json(savedOrder);
    });
};

exports.getOrderStatus = (req, res) => {
    return res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        { new: true },
        (err, updatedOrder) => {
            if(err || !updatedOrder){
                return res.status(400).json({
                    error: `Failed to update the status of order with ID: ${req.body.orderId}`
                });
            }
            return res.json(updatedOrder);
        }
    );
};

/* end of order.js controller*/