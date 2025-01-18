const { link } = require('joi');
const mongoose = require('mongoose');

// סכמה לתמונה
const imageSchema = new mongoose.Schema({
  url: String,
  alt: String,
})

// סכמה לשם מלא 
const nameSchema = new mongoose.Schema({
  first: String,
  middle: String,
  last: String,
})

// סכמה למגדר 
const genderSchema = new mongoose.Schema({
  type: String,
  enum: ['זכר', 'נקבה', 'אחר'],
  // required: true, // במידה וארצה שזה יהיה שדה חובה
});

// סכמה לכתובת  
const addressSchema = new mongoose.Schema({
  country: String,
  city: String,
  street: String,
  houseNumber: Number,
})

// סכמה למשקל 
const weightSchema = new mongoose.Schema({
  startingWeight: {
    type: Number,
    min: 0, // משקל לא יכול להיות שלילי
  },
  currentWeight: {
    type: Number,
    min: 0,
  },
  targetWeight: {
    type: Number,
    min: 0,
  },
});

//  סכמה לאחוז שומן בגוף
const bodyFatSchema = new mongoose.Schema({
  startingBodyFat: {
    type: Number,
    min: 0, // אחוז שומן לא יכול להיות שלילי
    max: 100, // אחוז שומן לא יכול לעלות על 100%
  },
  currentBodyFat: {
    type: Number,
    min: 0,
    max: 100,
  },
  targetBodyFat: {
    type: Number,
    min: 0,
    max: 100,
  },
});

// סכמה ליעדים
const targetsSchema = new mongoose.Schema({
  type: String,
  enum: ['ירידה במשקל', 'כניסה לכושר', 'עלייה במשקל', 'עליה במסת שריר', 'שיפור יכולות אישיות']
});

// סכמה פנימית לניהול תפריט תזונה
const menuSchema = new mongoose.Schema({
  breakfast: {
    type: String,
    required: false, // לא חובה, יכול להיות ריק
    trim: true, // מסיר רווחים מיותרים
  },
  lunch: {
    type: String,
    required: false,
    trim: true,
  },
  dinner: {
    type: String,
    required: false,
    trim: true,
  },
  snacks: {
    type: String,
    required: false,
    trim: true,
  },
  additionalInstructions: {
    type: String,
    required: false,
    trim: true,
  },
});

// סכמה פנימית לניהול תכנית האימונים
const exerciseSchema = new mongoose.Schema({
  name: String,
  sets: {
    type: Number,
    min: 1, 
  },
  repetitions: String,
  personalInstruction: String, // הנחייה אישית (לא חובה)
});

// סכמה פנימית לתכנית אימונים
const workoutSchema = new mongoose.Schema({
  back: { type: String, required: true },
  chest: { type: String, required: true },
  biceps: { type: String, required: true },
  abs: { type: String, required: true },
  legs: { type: String, required: true },
  backHand: { type: String, required: true },
  cardio: { type: String, required: true }
});

// סכמה למוצר בודד בסל הקניות
const cartItemSchema = new mongoose.Schema({
  name: String,
  price: {
    type: Number,
    min: 0 // המחיר לא יכול להיות שלילי  
  },
  quantity: {// כמות המוצרים
    type: Number, 
    min: 1, // שיהיה לפחות פריט אחד
  },
});

// סכמה לסל קניות אישי
const cartSchema = new mongoose.Schema({
  items: [cartItemSchema], // מערך של פריטי קניות
  total: {
    type: Number, // סכום הקניות
    min: 0, // חייב להיות חיובי
  },
});

// סכמה להודעה אישית
const messageSchema = new mongoose.Schema({
  sender: {
    type: String, // שם השולח
    trim: true, // מסיר רווחים מיותרים
  },
  title: {
    type: String, // כותרת ההודעה
    trim: true,
  },
  content: {
    type: String, // תוכן ההודעה
    trim: true,
  },
  isRead: {
    type: Boolean, // האם ההודעה נקראה
    default: false, // ברירת מחדל: לא נקרא
  },
  createdAt: {
    type: Date, // תאריך יצירת ההודעה
    default: Date.now, // ברירת מחדל: הזמן הנוכחי להודעה חדשה
  },
});

// סכמה לקטגוריה
const categorySchema = new mongoose.Schema({
  type: String, // סיווג התוכן
  // enum: ['nutrition', 'fitness', 'motivation'], // ערכים מותרים בלבד
});

// סכמה לפסקת כתבה
const paramSchema = new mongoose.Schema({
  title: String,
  content: {type: String, required: true},
  picture: { imageSchema },
  isGold: Boolean,
});

// סכמה ללייקים לכתבה
const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  name: nameSchema,
});

// סכמה לקרדיטים
const creditSchema = new mongoose.Schema({
  name: String,
  link: String,
})

module.exports = {
  imageSchema,
  nameSchema,
  genderSchema,
  addressSchema,
  weightSchema,
  bodyFatSchema,
  targetsSchema,
  menuSchema,
  workoutSchema,
  cartSchema,
  messageSchema,
  categorySchema,
  paramSchema,
  likeSchema,
  creditSchema
};