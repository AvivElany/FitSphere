const { boolean } = require("joi");
const mongoose = require("mongoose");
const { imageSchema } = require("./common");

const adsSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        link: String,
        image: imageSchema,
        isActive: Boolean
    },
);

const Ads = mongoose.model("Ads", adsSchema);

module.exports = Ads