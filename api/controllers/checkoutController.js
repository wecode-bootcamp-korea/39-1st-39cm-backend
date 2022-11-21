const { checkoutService } = require('../services');

const orderItemsByUserId = async (req, res) => {
    try {
        //const userId = req.user;
        //머지되면 위에걸로 바꾸셈
        const { userId } = req.body;
        const totalPrice = await checkoutService.orderItemsByUserId(userId);
        return res.status(200).json({ totalPrice });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = {
    orderItemsByUserId,
};
