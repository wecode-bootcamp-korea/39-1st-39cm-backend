const { likeDao } = require('../models');
const { userDao } = require('../models');

const createLike = async (user_id, product_id) => {
    return likeDao.createLike(user_id, product_id);
};

const deleteLike = async (user_id, productId) => {
    return likeDao.deleteLike(user_id, productId);
};

module.exports = { createLike, deleteLike };
