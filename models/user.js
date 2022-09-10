const mongoose = require('mongoose');
const { Schema } = mongoose;
const Journal = require('./journal');

const userSchema = new Schema(
    {
        fullname: { 
            type: String,
        },
        username: { 
            type: String,
            required: [true, "username can't be empty"]
        },
        password: {
            type: String,
            required: [true, "password can't be empty"]
        },
        journals: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Journal'
        }]
    }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };