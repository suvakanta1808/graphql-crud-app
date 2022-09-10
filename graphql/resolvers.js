const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Journal } = require('../models/journal');
const { User } = require('../models/user');

const resolvers = {
    Query: {
        journals: async (_, {}) => {
            return await Journal.find();
        },
        login: async (_, {authData: {username, password}}) => {
            const user = await User.findOne({username: username});
            if(!user) {
                const error = new Error('User doesn\'t exist');
                error.status = 401;
                throw error;
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if(!isEqual) {
                const error = new Error('Invalid password');
                error.status = 422;
                throw error;
            }
            const token = jwt.sign(
                {
                userId: user._id.toString(),
                username: username
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
            );

            return { token: token, userId: user._id.toString() };
        }
    },
    Mutation: {
        signup: async (_, {userAuthInput: {username, fullname, password}}) => {
            const user = await User.findOne({username: username});
            if(user) {
                const error = new Error('Already a user with this username exists');
                error.status = 422;
                throw error;
            }
            var newUser;

            await bcrypt.hash(password,10).then(async (hashedPassword) => {
                newUser = new User({
                    username: username,
                    fullname: fullname,
                    password: hashedPassword
                });
                await newUser.save();
            });
            return newUser;
        },
        createJournal: async (_, {input: {content}}) => {
            var journal = new Journal({
                authorId: "ATH1234567",
                content: content,
                dop: new Date().toISOString(),
                dislikes: [],
                likes: []
            });
            await journal.save();
            return journal;
        }
    }
}

module.exports = resolvers;