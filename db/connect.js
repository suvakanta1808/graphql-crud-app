const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(
        url,
        {
            useUnifiedTopology: true, 
            useNewUrlParser: true
        },
        err => {
            if(err) {
                console.error('Connection to DB failed', err);
            } else {
                console.log('Connected to DB');
            }
        });
};

module.exports = connectDB;