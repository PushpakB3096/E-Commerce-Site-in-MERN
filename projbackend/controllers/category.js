/* start of category.js controller */

const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category){
            return res.status(400).json({
                error: `Category with ID: ${id} not found in the DB`
            });
        }
        req.category = category;
        next();
    });
};

exports.createCategory = (req, res) => {
    const newCategory = new Category(req.body);

    newCategory.save((err, savedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Could not save category"
            });
        }
        return res.json(savedCategory);
    });
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err || !categories){
            return res.status(400).json({
                error: "No categories not found"
            });
        }
        return res.json(categories);
    });
};

exports.updateCategory = (req, res) => {
    console.log("req.body", req.body);
    // console.log("req", req);
    
    Category.findByIdAndUpdate(
        { _id: req.category._id},
        { $set: req.body },             //update the info obtained from req.body
        { new: true, useFindAndModify: false},      //options
        (err, updatedCategory) => {
            if(err || !updatedCategory){
                return res.status(400).json({
                    error: "Some error occured while updating"
                });
            }
            return res.json({
                msg: `Category with ID: ${updatedCategory._id} has been updated`,
                updatedCategory
            });
        }
    );
};

exports.deleteCategory = (req, res) => {
    Category.findByIdAndDelete(
        { _id: req.category._id},
        (err, deletedCategory) => {
            if(err){
                return res.status(400).json({
                    error: "Failed to delete category"
                });
            }
            return res.json({
                msg: `Category with ID: ${req.category._id} has been deleted`,
                deletedCategory: deletedCategory
            });
        }
    );
};

/* end of category.js controller */