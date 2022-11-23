const { likeService } = require('../services');
const { CustomError } = require('../utils/error');

const checkLike = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user;
        const result = await likeService.checkLike(userId, productId);

        if (result) {
            return res.status(201).json({ isLiked: true });
        }

        if (!result) {
            return res.status(201).json({ isLiked: false });
        }
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const createLike = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user;

        const data = await likeService.createLike(userId, productId);

        const result = {
            ...data,
            isLiked: true,
        };

        return res.status(201).json({ result });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const deleteLike = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user;

        if (isNaN(productId)) {
            throw new CustomError('BAD_REQUEST', 400);
        }

        const data = await likeService.deleteLike(userId, productId);

        const result = {
            ...data,
            isLiked: false,
        };

        return res.status(200).json({ result });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = { createLike, deleteLike, checkLike };
