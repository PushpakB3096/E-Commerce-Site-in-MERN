/* for product schema */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema;

const ProductSchema = new schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 28
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 500
    },
    cost: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 28,
    },
    category: { 
        type: ObjectId,
        ref: "Category",         //linking to CategorySchema
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    image: {
        data: Buffer,
        contentType: String
    }
},
{
    timestamps: true //to keep track of when a particular record was stored
});

module.exports = mongoose.model("Product", ProductSchema);

/* end of product schema */