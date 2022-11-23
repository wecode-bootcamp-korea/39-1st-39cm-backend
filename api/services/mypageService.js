const { mypageDao } = require('../models');

const getUserInformation = async (userId) => {
    return await mypageDao.getUserInformation(userId);
};

const getUserOrdered = async (userId) => {
    return await mypageDao.getUserOrdered(userId);
};

module.exports = { getUserInformation, getUserOrdered };
