/* start of product.js controller */

const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const Product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
           .populate("category")
           .exec((err, product) => {
                if(err || !product){
                    return res.status(404).json({
                        error: `Product with ID: ${id} not found`       //TODO: refactor this for proper error message
                    });
                }
                req.product = product;
                next();
            });
};

exports.createProduct = (req, res) => {
    const form = new formidable.IncomingForm();

    //configuring the form
    form.keepExtensions = true;
    form.maxFileSize = 5 * 1024 * 1024;      //5 mb file size

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Some problem occured"
            });
        }

        const newProduct = new Product(fields);     //TODO: check if 'fields' is valid or not first before creating the new product
        
        //handling file
        if(file.photo){
            if(file.photo.size > (5 * 1024 * 1024)){
                return res.status(413).json({
                    error: "The file size is greater than 5 Mb"
                });
            }
            newProduct.image.data = fs.readFileSync(file.photo.path);
            newProduct.image.contentType = file.photo.type;
        }

        newProduct.save((err, product) => {
            if(err || !product){
                return res.status(400).json({
                    error: "Some error occured while saving the product"
                });
            }
        });
    });
    

};

/* end of product.js controller */