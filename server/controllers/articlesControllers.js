
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Articles = require('../models/Articles');
const schemas = require("../schemas/articlesSchema");


//========================================
// יש להסדיר את כל הסכמה כדי לראות שהכל יעבוד כמו שצריך
// כולל התמונות והקישורים עם התגית URI
//========================================


const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

// POST  [V] --- יש להסדיר את העלאת התמונות בסכמה
const createArticle = async (req, res) => {

    // validate the request's body using joi
    const { error, value } = schemas.createNewArticle.validate(req.body);
    // check if there are joi validation errors
    if (error) {
        const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
        return res.status(400).json({ success: false, message: errorsArray });
    }
    // create a new Article instance (it's only in memory- until we actually save it)
    const newArticle = new Articles(value);
    console.log("newArticle is: ", newArticle);
    
    // save the Articles to database
    try {
        const saved = await newArticle.save();
        // success ! return a response
        return res.status(201).json({
            created: saved,
        });
    } catch (err) {
        // error
        return res
            .status(500)
            .json({ success: false, message: `error saving the Article` });
    }
};

//GET [V]
const getAllArticles = async (req, res) => {

    try {
        const allArticles = await Articles.find({});

        return res.status(200).json({
        data: allArticles,
        });

    } catch (err) {

        // return an error message
        return res.status(400).json({
        success: false,
        message: err.message,
        });

    }
};

// GET [V]
const getArticleById = async (req, res) => {

    const { id } = req.params;

    try {
        // find the Article that matches this id
        const found = await Articles.findById(id).exec();
        // found
        if (found) {
        // return the Article found
        return res.status(200).json({
            data: found,
        });
        }
        // not found
        return res.status(404).json({
        success: false,
        message: `Articles id '${id}' not found`,
        });
    } catch (err) {
        // return an error message
        return res.status(400).json({
        success: false,
        message: "Invalid format for Articles id",
        });
    }
};

// PUT  [V]
const updateArticles = async (req, res) => {
    
    // get the id from url (no need to parseInt, we're using string type id)
    const { id } = req.params;
    // validate the request's body using joi
    const { error, value } = schemas.updateArticle.validate(req.body);
    if (error) {
        const errorsArray = error.details.map((err) => err.message); 
        return res.status(400).json({ success: false, message: errorsArray });
    }
    try {
        const updateArticle = await Articles.findByIdAndUpdate(id, value, { new: true }).exec();
        // not found- return a response and stop execution
        if (!updateArticle)
        return res
            .status(404)
            .json({ success: false, message: `Article id ${id} was not found.` });
        // found- return a response
        return res.status(200).json({
        updated: updateArticle,
        });
    } catch (err) {
        return res
        .status(404)
        .json({ success: false, message: `Article id ${id} was not found.` });
    }
};

// PATCH  [V]
const updateThingInArticle = async (req, res) => {
    
  // validate the request's body using joi
    const { error, value } = schemas.updateArticle.validate(req.body);

    if (error) {
        const errorsArray = error.details.map((err) => err.message);
        return res.status(400).json({ success: false, message: errorsArray });
    }

    // get the id from url (no need to parseInt, we're using string type id)
    const { id } = req.params;

    try {
        const updated = await Articles.findByIdAndUpdate(id, value, { new: true }).exec();
        // not found- return a response and stop execution
        if (!updated)
        return res
            .status(404)
            .json({ success: false, message: `article id ${id} was not found.` });
        // found- return a response
        return res.status(200).json({
        updated: updated,
        });
    } catch (err) {
        return res
        .status(404)
        .json({ success: false, message: `Article id ${id} was not found.` });
    }
};

// DELETE  [V]
const deleteArticle = async (req, res) => {

    const { id } = req.params;
    
    try {
        const deleted = await Articles.findByIdAndDelete(id).exec();
        if (!deleted) throw new Error();

        // found & deleted
        return res.status(200).json({ deleted: deleted });
    } catch (err) {
        return res
        .status(404)
        .json({ success: false, message: `Article id ${id} not found` });
    }
    };

module.exports = {
    createArticle, // post
    getAllArticles, // get
    getArticleById ,// get:id
    updateArticles, // put:id
    updateThingInArticle, // patch:id
    deleteArticle , // delete:id
};