/* for product-in-cart schema */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema;

const ProductInCartSchema = new schema({
    product: {
        type: ObjectId,
        ref: "Product"    //linking to ProductSchema
    },
    quantity: {
        type: Number,
        default: 0
    },
    cost: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("ProductInCart", ProductInCartSchema);

/* end of product schema */