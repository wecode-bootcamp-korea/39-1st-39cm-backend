const { likeDao } = require('../models');
const { CustomError } = require('../utils/error');

const createLike = async (user_id, product_id) => {
    return likeDao.createLike(user_id, product_id);
};

const deleteLike = async (user_id, productId) => {
    const checkLike = await likeDao.getLikeUserId(user_id);

    if (!checkLike) {
        throw new CustomError('NOT_CLICK_LIKE_IT', 400);
    }

    return likeDao.deleteLike(user_id, productId);
};

module.exports = { createLike, deleteLike };
