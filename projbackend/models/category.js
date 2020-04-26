/* for category schema */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

//TODO: deprecated feature because now only admins can create categories so no need of enforcing this
//TODO: move this to a specific file for enums later
//defining names of category as an enum
const categoryNames = {
    ELECTRONICS: "electronics",
    CLOTHES: "clothes",
    FURNITURE: "furniture",
    BEAUTY: "beauty",
    FITNESS: "fitness",
    AUTOMOBILE: "automobile",
    ENTERTAINMENT: "entertainment",
    BOOKS: "books",
    KITCHEN: "kitchen"
}; 

Object.freeze(categoryNames);       //don't allow new entries to get added in the enum

const categorySchema = new schema({
    name: {
        type: categoryNames,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("Category", categorySchema);

/* end of category schema */