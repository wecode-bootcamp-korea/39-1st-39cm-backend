const { orderDao, userDao, productDao } = require('../models');
const { CustomError } = require('../utils/error');

const orderItems = async (userId, orders) => {
    const { point } = await userDao.getPointByUserId(userId);
    const totalPrice = await getTotalPriceOfOrders(orders);
    if (point <= totalPrice) throw new CustomError('NOT_ENOUGH_POINT', 422);
    const [{ orderId }] = await orderDao.addOrder(userId);
    await orderDao
        .addOrderItems({
            toSqlString: function () {
                return addOrderItemsQueryBuilder(orders, orderId);
            },
        })
        .catch(async () => {
            await orderDao.deleteOrderItemsByOrderId(orderId);
            await orderDao.deleteOrderByOrderId(orderId);
            throw new Error('UNEXPECTED ERROR');
        });
    await userDao.updatePointByUserId(point - totalPrice, userId);
};

const addOrderItemsQueryBuilder = (orders, orderId) => {
    const items = [];
    for (const item of orders) {
        items.push(`(${item.amount},${orderId},${item.productId},1)`);
    }
    return items.join(', ');
};

const getTotalPriceOfOrders = async (orders) => {
    let totalPrice = 0;
    for (const order of orders) {
        if (!(await productDao.checkIfProductExists(order.productId))[0])
            throw new CustomError('PRODUCT_DOES_NOT_EXIST', 404);
        totalPrice += (await productDao.getProductByProductId(order.productId))[0].price * order.amount;
    }
    return totalPrice;
};

module.exports = {
    orderItems,
};
