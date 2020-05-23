/* for order schema */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProductInCartSchema = require("./productincart").schema;

const {ObjectId} = mongoose.Schema;

const OrderSchema = new schema({
    products: [ProductInCartSchema],
    transactionId: {},
    amount: {
        type: Number
    },
    address: {
        type:  String,
        trim: true,
        maxlength: 2000
    },
    user: {
        type: ObjectId,
        ref: "User"    //linking to UserSchema
        
    },
    status: {   //show the status of the order to the user
        type: String,
        enum: ["Recieved", "Processed", "Shipped", "Delivered", "Cancelled"],
        default: "Recieved"
    },
    updated: {
        type: Date   //to show the when the order was last updated
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Order", OrderSchema);

/* end of product schema */