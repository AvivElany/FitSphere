const schemas = require("../schemas/productsSchema");
const Products = require("../models/Products");
const jwt = require("jsonwebtoken");


//POST  [V]
const createNewProduct = async (req, res) => {
     // validate the request's body using joi
    const { error, value } = schemas.createNewProduct.validate(req.body);
    // check if there are joi validation errors
    if (error) {
        const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
        return res.status(400).json({ success: false, message: errorsArray });
    }
    // create a new Ad instance (it's only in memory- until we actually save it)
    const newProduct = new Products(value);
    console.log("newProduct is: ", newProduct);
    
    // save the Ad to database
    try {
        const saved = await newProduct.save();
        // success ! return a response
        return res.status(201).json({
            created: saved,
        });
    } catch (err) {
        // error
        return res
            .status(500)
            .json({ success: false, message: `error saving the Products` });
    }
};

//GET [V]
const getAllProducts = async (req, res) => {

    try {
        const allProducts = await Products.find({});

        return res.status(200).json({
        data: allProducts,
        });

    } catch (err) {

        // return an error message
        return res.status(400).json({
        success: false,
        message: err.message,
        });

    }
};

//GET -[V]
const getProductById = async (req, res) => {

    const { id } = req.params;

    try {
        // find the product that matches this id
        const found = await Products.findById(id).exec();
        // found
        if (found) {
        // return the Product found
        return res.status(200).json({
            data: found,
        });
        }
        // not found
        return res.status(404).json({
            success: false,
            message: `Product id '${id}' not found`,
        });
    } catch (err) {
        // return an error message
        return res.status(400).json({
        success: false,
        message: "Invalid format for product id",
        });
    }
};

//PUT  [V]
const updateProduct = async (req, res) => {
    
    // get the id from url (no need to parseInt, we're using string type id)
    const { id } = req.params;
    // validate the request's body using joi
    const { error, value } = schemas.updateProduct.validate(req.body);
    if (error) {
        const errorsArray = error.details.map((err) => err.message); 
        return res.status(400).json({ success: false, message: errorsArray });
    }
    try {
        const updateProduct = await Products.findByIdAndUpdate(id, value, { new: true }).exec();
        // not found- return a response and stop execution
        if (!updateProduct)
        return res
            .status(404)
            .json({ success: false, message: `Product id ${id} was not found.` });
        // found- return a response
        return res.status(200).json({
        updated: updateProduct,
        });
    } catch (err) {
        return res
        .status(404)
        .json({ success: false, message: `Product id ${id} was not found.` });
    }
};

// PATCH  [V]
const updateQuentityOfProduct = async (req, res) => {
    const { id } = req.params;
    const { stockQuantity } = req.body;
    try {
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product id '${id}' not found`,
            });
        }
        product.stockQuantity = stockQuantity;
        const updated = await product.save();
        return res.status(200).json({
            updated,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `error updating the product stock Quantity`,
        });
    }
};

//DELETE  [V]
const deleteProduct = async (req, res) => {

    const { id } = req.params;
    
    try {
        const deleted = await Products.findByIdAndDelete(id).exec();
        if (!deleted) throw new Error();

        // found & deleted
        return res.status(200).json({ deleted: deleted });
    } catch (err) {
        return res
        .status(404)
        .json({ success: false, message: `Product id ${id} not found` });
    }
    };

module.exports = {
    createNewProduct, //post
    getAllProducts, //get
    getProductById ,//get:id
    updateProduct, //put:id
    updateQuentityOfProduct, //patch:id
    deleteProduct ,//delete:id
};