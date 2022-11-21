const { cartDao, orderDao } = require('../models');
const { getBasketsByUserId } = require('../models/cartDao');

const orderItemsByUserId = async (userId) => {
    return getPriceOfTotalBasketsByUserId(userId);
};

const getPriceOfTotalBasketsByUserId = async (userId) => {
    const baskets = await cartDao.getBasketsByUserId(userId);
    console.log(userId);
    console.log(baskets);
    let totalPrice = 0;
    for (b of baskets) {
        totalPrice += b.price * b.amount;
    }
    return totalPrice;
};

module.exports = {
    orderItemsByUserId,
    getPriceOfTotalBasketsByUserId,
};
