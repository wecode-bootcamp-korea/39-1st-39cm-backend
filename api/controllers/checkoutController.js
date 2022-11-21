const { checkoutService } = require('../services');
const { CustomError } = require('../utils/error');

const orderItems = async (req, res) => {
    try {
        const userId = req.user;
        const { orders } = req.body;
        if (!Array.isArray(orders) || orders.length === 0) throw new CustomError('BAD_REQUEST', 400);
        if (
            orders.some((order) => {
                return isNaN(order.amount) || order.amount === 0 || isNaN(order.productId);
            })
        ) {
            throw new CustomError('BAD_REQUEST', 400);
        }
        await checkoutService.orderItems(userId, orders);
        return res.status(200).json({ message: 'checkedOut' });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = {
    orderItems,
};
