const { likeDao } = require('../models');
const { CustomError } = require('../utils/error');

const checkLike = async (userId, productId) => {
    return await likeDao.getLikeUserId(userId, productId);
};

const createLike = async (userId, productId) => {
    const checkLike = await likeDao.getLikeUserId(userId, productId);

    if (checkLike) {
        throw new CustomError('ALREADY_LIKED', 400);
    }

    return likeDao.createLike(userId, productId);
};

const deleteLike = async (userId, productId) => {
    const checkLike = await likeDao.getLikeUserId(userId, productId);

    if (!checkLike) throw new CustomError('NO_PRODUCT_TO_DISLIKE', 400);

    return likeDao.deleteLike(userId, productId);
};

module.exports = { createLike, deleteLike, checkLike };
