/* for category schema */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    name: {
        type: categoryNames
    }
});

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

module.exports = mongoose.model("Category", categorySchema);

/* end of category schema */