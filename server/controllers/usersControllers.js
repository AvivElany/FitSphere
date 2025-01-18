const schemas = require("../schemas/usersSchema");
const User = require("../models/Users");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;


//POST  --  V
const register = async (req, res) => {

  // validate the request's body using joi
  const { error, value } = schemas.createNewUser.validate(req.body);
  console.log("the body is: ", req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    console.log(errorsArray);
    return res.status(400).json({ success: false, message: errorsArray });
  }

  try {
    // check if the email is already in use (in db)
    const existingUser = await User.find({ email: value.email });
console.log("==============existingUser===========: ", existingUser);
    // if this email is in use- send an error response
    if (existingUser.length > 0)
      return res
        .status(409)
        .json({
          success: false,
          message: `Email ${value.email} is already in use! consider logging in`,
        });
    // create new user in memory
    const newUser = new User(value);
    // hash the password
    const hashedPassword = await bcrypt.hash(value.password, 10);
    // replace the plain-text password we received from the user, by its hashed version
    newUser.password = hashedPassword;
    // set isManager to false
    newUser.isManager = false;
    // save the new user to the database
    const saved = await newUser.save();
    console.log("saved is: ",saved);

    const token = jwt.sign(
      {
        id: saved.id,
        isManager: saved.isManager,
        isTrainer: saved.isTrainer,
        isPremium: saved.isPremium,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );
    console.log("newUser is: ", newUser);
    // success! send the response with token
    return res
      .status(201)
      .json({ created: newUser, token: token });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: `Error registering user: ${err.message}`,
      });
  }
};

//POST  --  V
const login = async (req, res) => {
  // validate the request's body using joi
  const { error, value } = schemas.login.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    return res.status(400).json({ success: false, message: errorsArray });
  }

  try {
    const user = await User.findOne({ email: value.email });
    // user not found
    if (!user)
      return res
        .status(403)
        .json({ success: false, message: "Invalid credintials" });
    // user found
    // check if password match
    const isMatch = await bcrypt.compare(value.password, user.password);
    // no match
    if (!isMatch)
      return res
        .status(403)
        .json({ success: false, message: "Invalid credintials" });
    // match
    // create a new token
    const token = jwt.sign(
      {
        _id: user._id,
        isManager: user.isManager, // מנהלי מערכת
        isTrainer: user.isTrainer,     // מדריכים
        isPremium: user.isPremium,     // מתאמנים מנויים
        isDeleted: user.isDeleted,     // נמחק והועבר לארכיון?
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );
    console.log(token);
    // success ! send response + token
    return res.status(200).json( token ); //שולח טוקן נקי, בלי מפתחות
  } catch (err) {
    // error
    return res
      .status(500)
      .json({ success: false, message: `Error loggin-in: ${err.message} - תקלת שרת` });
  }
};


//GET
const getAllUsers = async (req, res) => {

  try {
    const allUsers = await User.find({}).select('-password').exec();

    return res.status(200).json({
      data: allUsers,
    });

  } catch (err) {

    // return an error message
    return res.status(400).json({
      success: false,
      message: err.message,
    });

  }
};

//GET
const getUserById = async (req, res) => {

  const { id } = req.params;

  try {
    // find the user that matches this id
    const found = await User.findById(id).select('-password').exec();
    // found
    if (found) {
      // return the user found
      return res.status(200).json({
        data: found,
      });
    }
    // not found
    return res.status(404).json({
      success: false,
      message: `User id '${id}' not found`,
    });
  } catch (err) {
    // return an error message
    return res.status(400).json({
      success: false,
      message: "Invalid format for users id",
    });
  }
};

//GET -------------------- לבדוק לוגיקה, למשיכת כל המשתמשים המנויים
const getAllPremium = async (req, res) => {

  const premium = req.params.isPremium;

  try {
    // find the user that matches this premium acount
    const found = await User.find({ isPremium: true});
    // found
    if (found) {
      // return the user found
      return res.status(200).json({
        data: found,
      });
    }
    // not found
    return res.status(404).json({
      success: false,
      message: `user from classroom '${classroomName}' not found`,
    });
  } catch (err) {
    // return an error message
    return res.status(400).json({
      success: false,
      message: "Invalid format for user of classroom",
    });
  }
}; 

//PUT  --  V
const updateUser = async (req, res) => {
  
  // validate the request's body using joi
  const { error, value } = schemas.updateUser.validate(req.body);

  if (error) {
    const errorsArray = error.details.map((err) => err.message); 
    console.log(errorsArray);
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;

  try {
    const updateUser = await User.findByIdAndUpdate(id, value, { new: true }).select('-password').exec();
    // not found- return a response and stop execution
    if (!updateUser)
      return res
        .status(404)
        .json({ success: false, message: `user id ${id} was not found.` });
    // found- return a response
    return res.status(200).json({
      updated: updateUser,
    });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `user id ${id} was not found.` });
  }
};

//PATCH  --  V
const updateGrades = async (req, res) => {
  
  // validate the request's body using joi
  const { error, value } = schemas.updateGrades.validate(req.body);

  if (error) {
    const errorsArray = error.details.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorsArray });
  }
  
  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;

  try {
    const updated = await User.findByIdAndUpdate(id, value, { new: true }).select('-password').exec();
    // not found- return a response and stop execution
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: `user id ${id} was not found.` });
    // found- return a response
    return res.status(200).json({
      updated: updated,
    });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `user id ${id} was not found.` });
  }
};

//DELETE  --  V
const deleteUser = async (req, res) => {

  const { id } = req.params;
  console.log("id to delete is: ", req.params);
  
  try {
    const deleted = await User.findByIdAndDelete(id).select('-password').exec();
    if (!deleted) throw new Error();

    // found & deleted
    return res.status(200).json({ deleted: deleted });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `user id ${id} not found` });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getAllPremium,
  register,
  login,
  deleteUser,
  updateUser,
  updateGrades,
};
