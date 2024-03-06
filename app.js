const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');

const app = express();

// middleware
app.use(express.static('public'));//letting you know that all will be stored in a public folder
app.use(express.json());

// view engine
app.set('view engine', 'ejs'); //stored in views

// database connection
const dbURI = 'mongodb+srv://o-jar:BellyjeaN@clustera.eygsymi.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoute); //keeping our routes separate from the main app code