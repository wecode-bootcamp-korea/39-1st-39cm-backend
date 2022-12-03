const { reviewDao } = require('../models');
const { CustomError } = require('../utils/error');

const createReview = async (product_id, user_id, title, content, image_url, rating) => {
    const createReview = await reviewDao.createReview(product_id, user_id, title, content, image_url, rating);

    return createReview;
};

const modifyReview = async (user_id, title, content, image_url, rating, review_id) => {
    const modifyReview = await reviewDao.modifyReview(user_id, title, content, image_url, rating, review_id);
    return modifyReview;
};

const deleteReview = async (user_id, reviewId) => {
    const checkReviewUser = await reviewDao.getReviewUserId(user_id);

    if (!checkReviewUser) {
        throw new CustomError('NO_REVIEW_TO_DELETE', 400);
    }

    return reviewDao.deleteReview(user_id, reviewId);
};

module.exports = { createReview, modifyReview, deleteReview };
