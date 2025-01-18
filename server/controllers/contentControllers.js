const schemas = require("../schemas/contentSchema");
const Content = require("../models/Contents");
const jwt = require("jsonwebtoken");

//POST  []
const createNewContent = async (req, res) => {
    // 1. לוודא שהבקשה חוקית באמצעות Joi
    const { error, value } = schemas.createNewContent.validate(req.body);

    if (error) {
        // אם יש שגיאות ולידציה
        const errorsArray = error.details.map((err) => err.message); // מיפוי השגיאות
        return res.status(400).json({ success: false, message: errorsArray });
    }

    try {
        // 2. בדוק אם המפתח (key) כבר קיים בבסיס הנתונים
        const existingContent = await Content.findOne({ key: value.key });

        if (existingContent) {
            // אם המפתח קיים כבר - מחזירים תשובה עם שגיאה
            return res.status(409).json({
                success: false,
                message: `Key "${value.key}" is already in use! Please choose another one.`,
            });
        }

        // 3. יצירת תוכן חדש
        const newContent = new Content(value);
        newContent.isManager = false; // או כל שדה אחר שצריך להוסיף

        // 4. שמירה בבסיס הנתונים
        const savedContent = await newContent.save();

        // 5. יצירת טוקן JWT
        const token = jwt.sign(
            {
                id: savedContent._id,
                isManager: savedContent.isManager,
                // הוסף שדות נוספים אם יש צורך
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRES_IN,
            }
        );

        // 6. החזרת התשובה עם התוכן שנשמר והטוקן
        return res.status(201).json({
            created: savedContent,
            token: token,
        });

    } catch (err) {
        // טיפול בשגיאות
        return res.status(500).json({
            success: false,
            message: `Error creating content: ${err.message}`,
        });
    }
};



//GET [V]
const getAllContents = async (req, res) => {

    try {
        const allContents = await Content.find({});

        return res.status(200).json({
        data: allContents,
        });

    } catch (err) {

        // return an error message
        return res.status(400).json({
        success: false,
        message: err.message,
        });

    }
};

//GET [V] 
const getContentByKey = async (req, res) => {
    const { key } = req.params;

    try {
        // חיפוש תוכן לפי מפתח תוכן
        const found = await Content.findOne({ key: key });

        if (found) {
            return res.status(200).json({
                success: true,
                data: found,
            });
        }

        // אם התוכן הרלוונטי לא נמצא
        return res.status(404).json({
            success: false,
            message: `Content with key '${key}' not found.`,
        });
    } catch (err) {
        console.error(`Error fetching content with key '${key}':`, err);
        // טיפול בשגיאה
        return res.status(400).json({
            success: false,
            message: "An error occurred while fetching the content. Please ensure the key is valid.",
            error: err.message,
        });
    }
};

// PUT [V]
const updateContents = async (req, res) => {
    const { key } = req.params;
    const { error, value } = schemas.updateContent.validate(req.body);
    
    if (error) {
        const errorsArray = error.details.map((err) => err.message);
        return res.status(400).json({ success: false, message: errorsArray });
    }
    try {
        const updatedContent = await Content.findOneAndUpdate({ key: key }, value, { new: true }).exec();
        if (!updatedContent) {
            return res.status(404).json({ success: false, message: `Content with key '${key}' was not found.` });
        }
        return res.status(200).json({
            updated: updatedContent,
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Error updating content: ${err.message}` });
    }
};

// PATCH  []
const updateThingInContent = async (req, res) => {
    const { id } = req.params;
    const { thing } = req.body;
};

//DELETE  []
const deleteContent = async (req, res) => {

    const { id } = req.params;
    
    try {
        const deleted = await Content.findByIdAndDelete(id).exec();
        if (!deleted) throw new Error();

        // found & deleted
        return res.status(200).json({ deleted: deleted });
    } catch (err) {
        return res
        .status(404)
        .json({ success: false, message: `Content id ${id} not found` });
    }
    };

module.exports = {
    createNewContent, //post
    getAllContents, //get
    getContentByKey ,//get:key
    updateContents, //put:key
    updateThingInContent, //patch:key
    deleteContent ,//delete:id
};