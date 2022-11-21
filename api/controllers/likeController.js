const { likeService } = require('../services');
const { CustomError } = require('../utils/error');

const createLike = async (req, res) => {
    try {
        const { product_id } = req.body;
        const user_id = req.user;

        await likeService.createLike(user_id, product_id);

        return res.status(201).json({ message: 'CREATELIKE_SUCCESS' });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const deleteLike = async (req, res) => {
    try {
        const { productId } = req.params;
        const user_id = req.user;

        if (isNaN(productId)) {
            throw new CustomError('BAD_REQUEST', 400);
        }

        await likeService.deleteLike(user_id, productId);

        return res.status(200).json({ message: 'DELETELIKE_SUCCESS' });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = { createLike, deleteLike };
