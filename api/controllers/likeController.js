const { likeService } = require('../services');

const createLike = async (req, res) => {
    const { product_id } = req.body;
    const user_id = req.user;

    await likeService.createLike(user_id, product_id);

    return res.status(201).json({ message: 'CREATELIKE_SUCCESS' });
};

const deleteLike = async (req, res) => {
    const { productId } = req.params;
    const user_id = req.user;

    await likeService.deleteLike(user_id, productId);

    return res.status(204).json({ message: 'DELETELIKE_SUCCESS' });
};

module.exports = { createLike, deleteLike };
