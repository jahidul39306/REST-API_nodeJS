require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const multerMiddleware = require('./middleware/multerMiddleware');
const path = require('path');

const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(multerMiddleware.multerMiddleware);

app.use(bodyParser.json());

// Roters
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
//

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({
        'message': 'Something went wrong',
    }); 
    // next();
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected');
        app.listen(process.env.PORT)
    })
    .catch(err => console.log(err));

