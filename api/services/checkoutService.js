const { cartDao, orderDao, userDao } = require('../models');
const { CustomError } = require('../utils/error');

const orderItemsByUserId = async (userId) => {
    const baskets = await cartDao.getBasketsByUserId(userId);
    const { point } = await userDao.getPointByUserId(userId);
    const totalPrice = getTotalPriceOfBaskets(baskets);
    if (baskets.length <= 0) throw new CustomError('EMPTY_BASKET', 422);
    if (point <= totalPrice) throw new CustomError('NOT_ENOUGH_POINT', 422);
    const [{ orderId }] = await orderDao.addOrder(userId);
    await orderDao
        .addOrderItems({
            toSqlString: function () {
                return addOrderItemsQueryBuilder(baskets, orderId);
            },
        })
        .finally(async () => {
            await cartDao.deleteAllBasketsByUserId(userId);
        })
        .catch(async () => {
            await orderDao.deleteOrderItemsByOrderId(orderId);
            await orderDao.deleteOrderByOrderId(orderId);
            throw new Error('UNEXPECTED ERROR');
        });

    await userDao.updatePointByUserId(point - totalPrice, userId);
};

const addOrderItemsQueryBuilder = (baskets, orderId) => {
    const items = [];
    for (const item of baskets) {
        items.push(`(${item.amount},${orderId},${item.productId},1)`);
    }
    return items.join(', ');
};

const getTotalPriceOfBaskets = (baskets) => {
    let totalPrice = 0;
    for (b of baskets) {
        totalPrice += b.price * b.amount;
    }
    return totalPrice;
};

module.exports = {
    orderItemsByUserId,
    getTotalPriceOfBaskets,
};
