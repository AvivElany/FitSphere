const Joi = require('joi')

const validationOptions = {
  stripUnknown:true,
  abortEarly:false,
}

const schemas = {
  createNewUser:
    Joi.object().keys({
      email: Joi.string().email().required(),
        // password rules: at least one upper case letter, at least one lower case letter, at least one number, at least one special characted, at least 7 characters total
      password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password'}).required(),
      name: Joi.object().keys({
        first: Joi.string().required(),
        middle: Joi.string().optional().default(""),
        last: Joi.string().required(),
      }),
      gender: Joi.string().optional(),
      age: Joi.number().required(),
      address: Joi.object().keys({
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().optional(),
      }),
      weight: Joi.object().keys({
        startingWeight: Joi.number().min(0),
        currentWeight: Joi.number().min(0),
        targetWeight: Joi.number().min(0),
      }),
      height: Joi.number().optional().min(0),
      bodyFat: Joi.object().keys({
        startingBodyFat: Joi.number().min(0),
        currentBodyFat: Joi.number().min(0),
        targetBodyFat: Joi.number().min(0),
      }),
      targets: Joi.string().optional(),
      menu: Joi.object().keys({
        breakfast: Joi.string().optional(),
        lunch: Joi.string().optional(),
        dinner: Joi.string().optional(),
        snacks: Joi.string().optional(),
        additionalInstructions: Joi.string().optional(),
      }).optional(),
      workout: Joi.object().keys({
        back: Joi.string().optional(),
        chest: Joi.string().optional(),
        biceps: Joi.string().optional(),
        abs: Joi.string().optional(),
        legs: Joi.string().optional(),
        shoulders: Joi.string().optional(),
        backHand: Joi.string().optional(),
        cardio: Joi.string().optional(),
      }).optional(),
      cart: Joi.object().keys({
        productID: Joi.string().optional(),
        name: Joi.string().optional(),
        price: Joi.number().optional(),
        quantity: Joi.number().optional(),
      }).optional(),
      messages: Joi.object().keys ({
        sander: Joi.string().optional(),
        title: Joi.string().optional(),
        content: Joi.string().optional(),
        isRead: Joi.boolean().optional(),
      }),
      phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'cellphonenumber'}).required(),
      image: Joi.object().keys({
        url: Joi.string().uri().optional(),
        alt: Joi.string().optional().default("Profile image"),
      }),
      isManager: Joi.boolean().optional(),
      isTrainer: Joi.boolean().optional(),
      isDeleted: Joi.boolean().optional().default(false),
    }).options(validationOptions),
  
  updateUser:
    Joi.object().keys({
      email: Joi.string().email().optional(),
        // password rules: at least one upper case letter, at least one lower case letter, at least one number, at least one special characted, at least 7 characters total
      password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password'}).required(),
      name: Joi.object().keys({
        first: Joi.string().optional(),
        middle: Joi.string().optional().default(""),
        last: Joi.string().optional(),
      }),
      gender: Joi.string().optional(),
      age: Joi.number().optional(),
      address: Joi.object().keys({
        country: Joi.string().optional(),
        city: Joi.string().optional(),
        street: Joi.string().optional(),
        houseNumber: Joi.number().optional(),
      }),
      weight: Joi.object().keys({
        startingWeight: Joi.number().min(0),
        currentWeight: Joi.number().min(0),
        targetWeight: Joi.number().min(0),
      }),
      height: Joi.number().optional().min(0),
      bodyFat: Joi.object().keys({
        startingBodyFat: Joi.number().min(0),
        currentBodyFat: Joi.number().min(0),
        targetBodyFat: Joi.number().min(0),
      }),
      targets: Joi.string().required(),
      menu: Joi.object().keys({
        breakfast: Joi.string().optional(),
        lunch: Joi.string().optional(),
        dinner: Joi.string().optional(),
        snacks: Joi.string().optional(),
        additionalInstructions: Joi.string().optional(),
      }),
      workout: Joi.object().keys({
        back: Joi.string().optional(),
        chest: Joi.string().optional(),
        biceps: Joi.string().optional(),
        abs: Joi.string().optional(),
        legs: Joi.string().optional(),
        shoulders: Joi.string().optional(),
        backHand: Joi.string().optional(),
        cardio: Joi.string().optional(),
      }),
      cart: Joi.object().keys({
        productID: Joi.string().optional(),
        name: Joi.string().optional(),
        price: Joi.number().optional(),
        quantity: Joi.number().optional(),
      }),
      messages: Joi.object().keys ({
        sander: Joi.string().optional(),
        title: Joi.string().optional(),
        content: Joi.string().optional(),
        isRead: Joi.boolean().optional(),
      }),
      phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'cellphonenumber'}).required(),
      image: Joi.object().keys({
        url: Joi.string().uri().optional(),
        alt: Joi.string().optional().default("Profile image"),
      }),
      isManager: Joi.boolean().optional(),
      isTrainer: Joi.boolean().optional(),
      isPremium: Joi.boolean().optional(),
      isDeleted: Joi.boolean().optional().default(false),
    }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"),
  
  // סכמה לעדכון תכנית אימונים
  
  updateWorkout:
    Joi.object().keys({
      workout: Joi.object().keys({
        back: Joi.string().optional(),
        chest: Joi.string().optional(),
        biceps: Joi.string().optional(),
        abs: Joi.string().optional(),
        legs: Joi.string().optional(),
        shoulders: Joi.string().optional(),
        backHand: Joi.string().optional(),
        cardio: Joi.string().optional(),
      }),
    }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"), 
    
  // סכמה לעדכון תפריט
  
  updateManu:
    Joi.object().keys({
      menu: Joi.object().keys({
        breakfast: Joi.string().optional(),
        lunch: Joi.string().optional(),
        dinner: Joi.string().optional(),
        snacks: Joi.string().optional(),
        additionalInstructions: Joi.string().optional(),
      }),
    }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"), 
    
  // סכמה לעדכון סל הקניות  
  updateCart:
    Joi.object().keys({
      cart: Joi.object().keys({
        productID: Joi.string().optional(),
        name: Joi.string().optional(),
        price: Joi.number().optional(),
        quantity: Joi.number().optional(),
      }),
    }).options(validationOptions).min(1).message("The request's body must include at-least one valid key"), 
    
  // סכמה להתחברות
  login:
    Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password'}).required(),
    }).options(validationOptions),
}

module.exports = schemas;