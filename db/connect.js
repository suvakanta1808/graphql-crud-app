require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose.connect(
        process.env.DB_CONNECT_URI,
        {
            useUnifiedTopology: true, 
            useNewUrlParser: true
        },
        err => {
            if(err) {
                console.error('Connection to DB failed');
            } else {
                console.log('Connected to DB');
            }
        })
};

module.exports = connectDB;