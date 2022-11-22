const { reviewService } = require('../services');

const createReview = async (req, res) => {
    try {
        const { product_id, title, content, image_url, rating } = req.body;

        await reviewService.createReview(user_id, product_id, title, content, image_url, rating);
        return res.status(201).json({ message: 'CREATEREVIEW_SUCCESS' });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const modifyReview = async (req, res) => {
    try {
        const { title, content, image_url, rating, review_id } = req.body;
        const user_id = req.user;

        const review = await reviewService.modifyReview(user_id, title, content, image_url, rating, review_id);

        return res.status(201).json({ review });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const user_id = req.user;

        if (isNaN(reviewId)) {
            throw new CustomError('BAD_REQUEST', 400);
        }

        await reviewService.deleteReview(user_id, reviewId);

        return res.status(200).json({ message: 'DELETEREVIEW_SUCCESS' });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = { createReview, modifyReview, deleteReview };
