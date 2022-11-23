const { cartService } = require('../services');
const { CustomError } = require('../utils/error');

const getBasketsByUserId = async (req, res) => {
    try {
        const userId = req.user;
        const baskets = await cartService.getBasketsByUserId(userId);
        return res.status(200).json({ baskets });
    } catch (err) {
        res.status(err.statusCode || 500).json(
            err.statusCode ? { message: err.message } : { message: 'UNEXPECTED_ERROR' }
        );
    }
};

const addOrUpdateBasketByUserId = async (req, res) => {
    try {
        const userId = req.user;
        const { productId, amount } = req.body;
        if (amount < 0 || isNaN(amount)) throw new CustomError('BAD_REQUEST', 400);
        const basket = await cartService.addOrUpdateBasketByUserId(userId, productId, amount);
        return res.status(200).json({ updated: basket });
    } catch (err) {
        res.status(err.statusCode || 500).json(
            err.statusCode ? { message: err.message } : { message: 'UNEXPECTED_ERROR' }
        );
    }
};

const deleteBasketsByBasketId = async (req, res) => {
    try {
        const userId = req.user;
        const { basketIds } = req.body;
        if (!Array.isArray(basketIds)) throw new CustomError('BAD_REQUEST', 400);
        for (const basketId of basketIds) {
            if (isNaN(basketId)) throw new CustomError('BAD_REQUEST', 400);
            await cartService.checkIfBasketExists(basketId, userId);
        }
        await cartService.deleteBasketsByBasketId(userId, basketIds);
        return res.status(204).end();
    } catch (err) {
        res.status(err.statusCode || 500).json(
            err.statusCode ? { message: err.message } : { message: 'UNEXPECTED_ERROR' }
        );
    }
};
module.exports = {
    getBasketsByUserId,
    addOrUpdateBasketByUserId,
    deleteBasketsByBasketId,
};
