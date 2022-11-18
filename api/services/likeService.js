const { likeDao } = require('../models');
const { userDao } = require('../models');
const { loginRequired } = require('../util/auth');

const createLike = async (user_id, product_id) => {
    loginRequired();
    // const user = await userDao.getUserById(user_id);

    // const clickeLike = user.id === user_id ? await likeDao.createLike(user_id, product_id) : false;

    return await likeDao.createLike(user_id, product_id);
};

const deleteLike = async (productId) => {};

module.exports = { createLike, deleteLike };
