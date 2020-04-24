/* for order schema */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema;

const OrderSchema = new schema({
    products: [ProductInCartSchema],
    transactionId: {},
    amount: {
        type: Number
    },
    address: {
        type:  String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    user: {
        type: ObjectId,
        ref: "User"    //linking to UserSchema
        
    },
    updated: {
        type: true   //to show the update of order to the user
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Order", OrderSchema);

/* end of product schema */