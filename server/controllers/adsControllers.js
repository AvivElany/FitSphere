const schemas = require('../schemas/adsSchema');
const Ads = require('../models/Ads');

//========================================
// יש להסדיר את כל הסכמה כדי לראות שהכל יעבוד כמו שצריך
// כולל התמונות והקישורים עם התגית URI
//========================================

// POST  [V] 
const createNewAds = async (req, res) => {
    // validate the request's body using joi
    const { error, value } = schemas.createNewAd.validate(req.body);
    // check if there are joi validation errors
    if (error) {
        const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
        return res.status(400).json({ success: false, message: errorsArray });
    }
    // create a new Ad instance (it's only in memory- until we actually save it)
    const newAd = new Ads(value);
    console.log("newAd is: ", newAd);
    
    // save the Ad to database
    try {
        const saved = await newAd.save();
        // success ! return a response
        return res.status(201).json({
            created: saved,
        });
    } catch (err) {
        // error
        return res
            .status(500)
            .json({ success: false, message: `error saving the Ad` });
    }
};

//GET [V]
const getAllAds = async (req, res) => {

    try {
        const allAds = await Ads.find({});

        return res.status(200).json({
        data: allAds,
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
const getAdById = async (req, res) => {

    const { id } = req.params;

    try {
        // find the ad that matches this id
        const found = await Ads.findById(id).exec();
        // found
        if (found) {
        // return the ad found
            return res.status(200).json({
            data: found,
        });
        }
        // not found
        return res.status(404).json({
            success: false,
            message: `Ads id '${id}' not found`,
        });
    } catch (err) {
        // return an error message
        return res.status(400).json({
            success: false,
            message: "Invalid format for ad id",
        });
    }
};

// PUT  [V]
const updateAd = async (req, res) => {
    
    // get the id from url (no need to parseInt, we're using string type id)
    const { id } = req.params;
    // validate the request's body using joi
    const { error, value } = schemas.updateAd.validate(req.body);
    if (error) {
        const errorsArray = error.details.map((err) => err.message); 
        return res.status(400).json({ success: false, message: errorsArray });
    }
    try {
        const updateAd = await Ads.findByIdAndUpdate(id, value, { new: true }).exec();
        // not found- return a response and stop execution
        if (!updateAd)
        return res
            .status(404)
            .json({ success: false, message: `Ad id ${id} was not found.` });
        // found- return a response
        return res.status(200).json({
        updated: updateAd,
        });
    } catch (err) {
        return res
        .status(404)
        .json({ success: false, message: `Ad id ${id} was not found.` });
    }
};

// PATCH  [V]
const updateThingInAd = async (req, res) => {
    
  // validate the request's body using joi
    const { error, value } = schemas.updateAd.validate(req.body);

    if (error) {
        const errorsArray = error.details.map((err) => err.message);
        return res.status(400).json({ success: false, message: errorsArray });
    }

    // get the id from url (no need to parseInt, we're using string type id)
    const { id } = req.params;

    try {
        const updated = await Ads.findByIdAndUpdate(id, value, { new: true }).exec();
        // not found- return a response and stop execution
        if (!updated)
        return res
            .status(404)
            .json({ success: false, message: `Ad id ${id} was not found.` });
        // found- return a response
        return res.status(200).json({
        updated: updated,
        });
    } catch (err) {
        return res
        .status(404)
        .json({ success: false, message: `Ad id ${id} was not found.` });
    }
};

// DELETE  [V]
const deleteAd = async (req, res) => {

    const { id } = req.params;
    
    try {
        const deleted = await Ads.findByIdAndDelete(id).exec();
        if (!deleted) throw new Error();

        // found & deleted
        return res.status(200).json({ deleted: deleted });
    } catch (err) {
        return res
        .status(404)
        .json({ success: false, message: `Ad id ${id} not found` });
    }
    };

module.exports = {
    createNewAds, // post
    getAllAds, // get
    getAdById ,// get:id
    updateAd, // put:id
    updateThingInAd, // patch:id
    deleteAd , // delete:id
};