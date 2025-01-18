const mongoose = require("mongoose");
const {
  nameSchema,
  genderSchema,
  addressSchema,
  weightSchema,
  bodyFatSchema,
  targetsSchema,
  menuSchema,
  workoutSchema,
  imageSchema,
  cartSchema,
  messageSchema,
} = require("./common");

const usersSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    name: nameSchema,
    gender: String, // genderSchema
    age: Number,
    address: addressSchema,
    weight: weightSchema,
    height: Number,
    bodyFat: bodyFatSchema,
    targets: String, // targetsSchema
    menu: menuSchema,
    workout: [workoutSchema],
    cart: cartSchema,
    messages: messageSchema,
    phone: String,
    isMale: Boolean,
    image: imageSchema,
    isManager: Boolean,
    isTrainer: Boolean, 
    isDeleted: Boolean, 
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
