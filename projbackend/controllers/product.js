/* start of product.js controller */

const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const { validationResult } = require("express-validator"); //importing package for validation

const Product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(404).json({
          error: `Product with ID: ${id} not found`, //TODO: refactor this for proper error message
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
  form.maxFileSize = 5 * 1024 * 1024; //5 mb file size

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Some problem occured",
      });
    }

    const errors = validationResult(req); //getting all the errors from the body of the request, if any

    //checking if there are any validation errors
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: `Param \'${
          errors.array()[0].param
        }\' could not be saved. Reason: ${errors.array()[0].msg}`,
      });
    }

    const newProduct = new Product(fields); //creating the new product object

    //handling file
    if (file.image) {
      if (file.image.size > 5 * 1024 * 1024) {
        return res.status(413).json({
          error: "The file size is greater than 5 Mb",
        });
      }
      newProduct.image.data = fs.readFileSync(file.image.path);
      newProduct.image.contentType = file.image.type;
    }

    newProduct.save((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Some error occured while saving the product",
        });
      }
      return res.status(200).json({
        msg: "Product saved successfully",
        product: {
          name: product.name,
          description: product.description,
          cost: product.cost,
          category: product.category,
          stock: product.stock,
          sold: product.sold,
        },
      });
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.image = undefined; //not returning the binary data because of performance issues
  return res.status(200).json(req.product);
};

//middleware that is used to display image on the product page - separated from the rest of the product data for performance
exports.image = (req, res, next) => {
  if (req.product.image.data) {
    res.set("Content-Type", req.product.image.contentType);
    return res.send(req.product.image.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, deletedProduct) => {
    if (err || !deletedProduct) {
      return res.status(400).json({
        error: `Failed to delete product with the ID: ${product._id}`,
      });
    }
    return res.status(200).json({
      msg: "Successfully deleted product",
    });
  });
};

exports.updateProduct = (req, res) => {
  const form = new formidable.IncomingForm();

  //configuring the form
  form.keepExtensions = true;
  form.maxFileSize = 5 * 1024 * 1024; //5 mb file size

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Some problem occured",
      });
    }

    var oldProduct = req.product; //fetching the product from req
    oldProduct = _.extend(oldProduct, fields); //updating the product using lodash module

    //handling file
    if (file.image) {
      if (file.image.size > 5 * 1024 * 1024) {
        return res.status(413).json({
          error: "The file size is greater than 5 Mb",
        });
      }
      oldProduct.image.data = fs.readFileSync(file.image.path);
      oldProduct.image.contentType = file.image.type;
    }

    oldProduct.save((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Some error occured while updating the product",
        });
      }
      return res.status(200).json({
        msg: "Product updated successfully",
        product: {
          name: product.name,
          description: product.description,
          cost: product.cost,
          category: product.category,
          stock: product.stock,
          sold: product.sold,
        },
      });
    });
  });
};

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
        .select("-image")   //not retrieving the image because of performance
        .populate("category")
        .sort([[ sortBy, "asc" ]])
        .limit(limit)
        .exec((err, allProducts) => {
            if (err || !allProducts) {        //TODO: add separate conditions for proper error message
                return res.status(400).json({
                    error: "Some error occured while fetching the products",
                });
            }
            return res.status(200).json(allProducts);
        });
};

//middleware that updates inventory every time an order is placed successfully
exports.updateInventory = (req, res, next) => {
    let operations = req.body.order.products.map(product => {
        return {
            updateOne: {
                filter: { _id: product._id },
                update: { $inc: { sold: +product.count, stock: -product.count }}
            }
        };
    });

    Product.bulkWrite(operations, {}, (err, products) => {
        if(err){        //TODO: write proper error message
            return res.status(400).json({
                error: "Bulk operations failed"
            });
        }
        next();
    });
};

exports.gallAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err){
            return res.status(400).json({
                error: "No category found"
            });
        }
        return res.json(category);
    });
};
/* end of product.js controller */