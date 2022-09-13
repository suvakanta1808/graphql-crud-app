const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAuth = require('../util/isAuth');
require('dotenv').config();

const { Journal } = require('../models/journal');
const { User } = require('../models/user');

const resolvers = {
    Query: {
        journals: async (_, {}, context) => {
            const userData = isAuth(context);
            return await Journal.find();
        },
        getJournal: async (_, { id }, context) => {
            // var decodedToken;
            // try{
            //     decodedToken = jwt.verify(context.token,process.env.JWT_SECRET);
            // } catch (err) {
            //     const error = new Error('Not Authenticated');
            //     error.status = 401;
            //     throw error;
            // }
            // if(!decodedToken) {
            //     const error = new Error('Authentication headers are missing');
            //     error.status = 422;
            //     throw error;
            // }
            const userData = isAuth(context);
            return await Journal.findById(id);
        },
        getUser: async (_, { id }, context) => {
            // var decodedToken;
            // try{
            //     decodedToken = jwt.verify(context.token,process.env.JWT_SECRET);
            // } catch (err) {
            //     const error = new Error('Not Authenticated');
            //     error.status = 401;
            //     throw error;
            // }
            // if(!decodedToken) {
            //     const error = new Error('Authentication headers are missing');
            //     error.status = 422;
            //     throw error;
            // }
            const userData = isAuth(context);
            return await User.findById(id).populate('journals');
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
        createJournal: async (_, {input: {content}}, context) => {
            // if(!context.token) {
            //     const error = new Error('Authentication headers are missing');
            //     error.status = 422;
            //     throw error;
            // }
            // var decodedToken;
            // try{
            //     decodedToken = jwt.verify(context.token,process.env.JWT_SECRET);
            // } catch (err) {
            //     const error = new Error('Not Authenticated');
            //     error.status = 401;
            //     throw error;
            // }
            const userData = isAuth(context);
            const user = await User.findOne({ _id: userData.userId });
            var journal = new Journal({
                authorId: userData.userId,
                content: content,
                dop: new Date().toISOString(),
                dislikes: [],
                likes: []
            });
            user.journals.push(journal);
            await journal.save();
            await user.save();
            return journal;
        },
        updateJournal: async (_, {updateJournalInput: {id, content}}, context) => {
            // if(!context.token) {
            //     const error = new Error('Authentication headers are missing');
            //     error.status = 422;
            //     throw error;
            // }
            // var decodedToken;
            // try{
            //     decodedToken = jwt.verify(context.token,process.env.JWT_SECRET);
            // } catch (err) {
            //     const error = new Error('Not Authenticated');
            //     error.status = 401;
            //     throw error;
            // }
            const userData = isAuth(context);
            const journal = await Journal.findById(id);
            if(journal.authorId.toString() !== userData.userId.toString()) {
                const error = new Error('Not Authorized');
                error.status = 401;
                throw error;
            }
            journal.content = content;
            await journal.save();
            return journal;
        },
        deleteJournal: async (_, {id}, context) => {
            // if(!context.token) {
            //     const error = new Error('Authentication headers are missing');
            //     error.status = 422;
            //     throw error;
            // }
            // var decodedToken;
            // try{
            //     decodedToken = jwt.verify(context.token,process.env.JWT_SECRET);
            // } catch (err) {
            //     const error = new Error('Not Authenticated');
            //     error.status = 401;
            //     throw error;
            // }
            const userData = isAuth(context);
            const journal = await Journal.findById(id);
            if(journal.authorId.toString() !== userData.userId.toString()) {
                const error = new Error('Not Authorized');
                error.status = 401;
                throw error;
            }
            await Journal.findByIdAndDelete(id);
            const user = await User.findById(journal.authorId);
            user.journals.pull(id);
            await user.save();
            return journal;
        }
    }
}

module.exports = resolvers;