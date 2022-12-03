const { orderDao, userDao, productDao } = require('../models');
const { CustomError } = require('../utils/error');

const orderItems = async (userId, orders) => {
    const { point } = await userDao.getPointByUserId(userId);
    const totalPrice = await getTotalPriceOfOrders(orders);
    if (point <= totalPrice) throw new CustomError('NOT_ENOUGH_POINT', 422);
    await orderDao.orderItemsTransaction(userId, orders, point - totalPrice).catch(() => {
        throw new CustomError('TRANSACTION_ERROR', 500);
    });
};

const getTotalPriceOfOrders = async (orders) => {
    let totalPrice = 0;
    for (const order of orders) {
        if (!(await productDao.getProductNameByProductId(order.productId))[0])
            throw new CustomError('PRODUCT_DOES_NOT_EXIST', 404);
        totalPrice += (await productDao.getProductByProductId(order.productId))[0].price * order.amount;
    }
    return totalPrice;
};

module.exports = {
    orderItems,
};
