const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const isAuth = (context) => {
    const token = context.token;
    if (!token || token === '') {
        throw new AuthenticationError('Authentication headers are missing');
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    } catch (err) {
        throw new AuthenticationError('Not Authenticated');
    }
};

module.exports = isAuth;