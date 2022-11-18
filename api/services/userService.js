const { userDao } = require('../models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const getUserById = async (id) => {
// 	return await userDao.getUserById(id)
// }

const signIn = async (email, password) => {
    const user = await userDao.getUserByEmail(email);

    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (!match) {
        const error = new Error('WRONG_PASSWORD');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({ id: user.id }, process.env.secretKey);

    return token;
};

module.exports = {
    signIn,
    // getUserById
};
