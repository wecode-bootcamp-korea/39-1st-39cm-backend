const { cartService } = require('../services');
const { CustomError } = require('../utils/error');

const getBasketsByUserId = async (req, res) => {
    try {
        //const userId = req.user;
        //머지되면 위에걸로 바꾸셈
        const { userId } = req.body;
        const baskets = await cartService.getBasketsByUserId(userId);
        return res.status(200).json({ baskets });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const addOrUpdateBasketByUserId = async (req, res) => {
    try {
        //const userId = req.user;
        //머지되면 위에걸로 바꾸셈
        const { userId } = req.body;
        const { productId, amount } = req.body;
        if (amount < 0 || isNaN(amount)) throw new CustomError('BAD_REQUEST', 400);
        const basket = await cartService.addOrUpdateBasketByUserId(userId, productId, amount);
        return res.status(200).json({ updated: basket });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = {
    getBasketsByUserId,
    addOrUpdateBasketByUserId,
};
