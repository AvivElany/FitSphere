// Require
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const connectDB = require('./config/db');

// Initialize express
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('static'));

// Routes                                                 // Is All CRUD Done? // What need ?
app.use('/ads', require('./routes/adsRoutes'));           //     //  [V]       // להוסיף מודעות חדשות ורלוונטיות                                
app.use('/auth' , require('./routes/authRoutes'));        //     //  []        // להשמיש        
app.use('/facts', require('./routes/factsRoutes'));;      //     //  [V]       // להוסיף עובדות חדשות ורלוונטיות      
app.use('/users', require('./routes/usersRoutes'));       //     //  [V]       // להכניס את כל סוגי המשתמשים                              
app.use('/content', require('./routes/contentRoutes'));   //     //  []        // לנהל מפתחות של כל התוכן ולהכניס תוכן לקראת העבודה על הפרונט                       
app.use('/articles', require('./routes/articlesRoutes')); //     //  [V]       // לנהל מאמרים ולהכניס מאמרים לקראת העבודה על הפרונט                   
app.use('/products', require('./routes/productsRoutes')); //     //  [V]       // לנהל מוצרים ולהכניס מוצרים לקראת העבודה על הפרונט                              

// Port
const { PORT } = process.env; //import port from env file

// Connect to database
connectDB().then(()=>{ //callback hell -- we always prefer to use async-await
  // Run server
  app.listen(PORT, ()=> console.log(`Server is listening for requests on http://127.0.0.1:${PORT}`))
});