const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');

const journalSchema = new Schema(
    {
        dop: { 
            type: String,
        },
        authorId: { 
            type: String,
            required: [true, "author id can't be empty"]
        },
        content: { 
            type: String,
            required: [true, "content can't be empty"]
        },
        likes: [{
            type: String,
        }],
        dislikes:  [{
            type: String,
        }]
    }
);

const Journal = mongoose.model("Journal", journalSchema);
module.exports = { Journal };
