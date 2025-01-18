const mongoose = require("mongoose");
const { categorySchema } = require("./common");

const productsSchema = new mongoose.Schema(
    {
        name: String, 
        description: String, 
        price: Number,
        discountPercentage: Number, 
        stockQuantity: Number, 
        link: String, 
        picture: { url: String, alt: String }, 
        colors: [String],
        flavors: [String],
        category: String,
    },
);

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
