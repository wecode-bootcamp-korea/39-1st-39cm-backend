const { userDao } = require('../models');
const { CustomError } = require('../utils/error');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserById = async (id) => {
    return await userDao.getUserById(id);
};

const signUp = async (name, email, password, gender, address) => {
    const emailValidation = new RegExp(
        '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$'
    );

    if (!emailValidation.test(email)) {
        throw new CustomError('EMAIL_IS_NOT_VALID', 400);
    }

    const pwValidation = new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.{8,20})');
    if (!pwValidation.test(password)) {
        throw new CustomError('PASSWORD_IS_NOT_VALID', 409);
    }

    const user = await userDao.getUserByEmail(email);

    if (user) {
        throw new CustomError('DUPLICATE_EMAIL', 400);
    }

    const Gender = Object.freeze({
        남자: 1,
        여자: 2,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await userDao.createUser(name, email, hashedPassword, Gender[gender], address);

    return createUser;
};

const signIn = async (email, password) => {
    const user = await userDao.getUserByEmail(email);

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new CustomError('WRONG_PASSWORD', 400);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return token;
};

const getUserInformation = async (userId) => {
    return await userDao.getUserInformation(userId);
};

const getUserOrdered = async (userId) => {
    return await userDao.getUserOrdered(userId);
};

module.exports = {
    signUp,
    signIn,
    getUserById,
    getUserInformation,
    getUserOrdered,
};
