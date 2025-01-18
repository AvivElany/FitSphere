const schemas = require("../schemas/factsSchema");
const Facts = require("../models/Facts");

// ===================================
// יש לשכתב מחדש את הדאטהבייס כדי שכל עובדה תהיה עם איידי משלה, כך שאפשר יהיה למחוק עובדה ספציפית
// כרגע כל העובדות נמצאות באותו אובייקט
// ===================================

//POST  [V] 
const createNewFact = async (req, res) => {

    // validate the request's body using joi
    const { error, value } = schemas.createNewFact.validate(req.body);
    // check if there are joi validation errors
    if (error) {
        const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
        return res.status(400).json({ success: false, message: errorsArray });
    }
    // create a new fact instance (it's only in memory- until we actually save it)
    const newFacts = new Facts(value);
    console.log("newFacts is: ", newFacts);
    
    // save the fact to database
    try {
        const saved = await newFacts.save();
        // success ! return a response
        return res.status(201).json({
            created: saved,
        });
    } catch (err) {
        // error
        return res
            .status(500)
            .json({ success: false, message: `error saving the fact` });
    }
};

//GET [V]
const getAllFacts = async (req, res) => {

    try {
        const allFacts = await Facts.find({});

        return res.status(200).json({
        data: allFacts,
        });

    } catch (err) {

        // return an error message
        return res.status(400).json({
        success: false,
        message: err.message,
        });

    }
};

//GET -[V] --- עובד, אבל למצוא דרך להיכנס לתוך המפתחות ולשנות עובדות בכל קטגוריה
const getFactById = async (req, res) => {

    const { id } = req.params;
    console.log(req.params);
    

    try {
        // find the fact that matches this id
        const found = await Facts.findById(id).exec();
        // found
        if (found) {
        // return the fact found
            return res.status(200).json({
                data: found,
            });
        }
        // not found
        return res.status(404).json({
        success: false,
        message: `Fact id '${id}' not found`,
        });
    } catch (err) {
        // return an error message
        return res.status(400).json({
        success: false,
        message: "Invalid format for Fact id",
    });
    }
};

// PUT  [V]
const updateFact = async (req, res, next) => {
    const { id } = req.params;
    const { error, value } = schemas.updateFact.validate(req.body);
    if (error) {
        const errorsArray = error.details.map((err) => err.message);
        return res.status(400).json({ success: false, message: errorsArray });
    }
    try {
        const updateFact = await Facts.findByIdAndUpdate(id, value, { new: true }).exec();
        if (!updateFact) {
            return res.status(404).json({ success: false, message: `Fact id ${id} was not found.` });
        }
        return res.status(200).json({
            updated: updateFact,
        });
    } catch (err) {
        return res.status(404).json({ success: false, message: `Fact id ${id} was not found.` });
    }
};

//DELETE  [V]
const deleteFact = async (req, res) => {

    const { id } = req.params;
    
    try {
        const deleted = await Facts.findByIdAndDelete(id).exec();
        if (!deleted) throw new Error();

        // found & deleted
        return res.status(200).json({ deleted: deleted });
    } catch (err) {
        return res
        .status(404)
        .json({ success: false, message: `Fact id ${id} not found` });
    }
    };

module.exports = {
    createNewFact, //post
    getAllFacts, //get
    getFactById ,//get:id
    updateFact, //put:id
    deleteFact ,//delete:id
};