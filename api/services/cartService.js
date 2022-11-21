const { cartDao, productDao } = require('../models');
const { CustomError } = require('../utils/error');

const getBasketsByUserId = async (userId) => {
    return await cartDao.getBasketsByUserId(userId);
};

const addOrUpdateBasketByUserId = async (userId, productId, amount) => {
    if (!(await productDao.checkIfProductExists(productId))[0]) throw new CustomError('PRODUCT_DOES_NOT_EXIST', 404);
    const [row] = await cartDao.getBasketByUserIdAndProductId(userId, productId);
    if (!row && amount) await cartDao.addBasket(userId, productId, amount);
    if (!amount) await cartDao.deleteBasketsByBasketId(row?.basketId, userId);
    if (row && amount) await cartDao.updateBasket(row.basketId, userId, amount);
    return [await cartDao.getBasketByUserIdAndProductId(userId, productId)];
};

const deleteBasketsByBasketId = async (userId, basketIds) => {
    await cartDao.deleteBasketsByBasketId({
        toSqlString: function () {
            return `WHERE id IN ${deleteBasketsQueryBuilder(basketIds)} AND user_id = ${userId}`;
        },
    });
};

const checkIfBasketExists = async (basketId) => {
    if (!(await cartDao.checkIfBasketExists(basketId))[0]) throw new CustomError('BASKET_DOES_NOT_EXIST', 404);
};

const deleteBasketsQueryBuilder = (basketIds) => {
    const baskets = [];
    for (const basket of basketIds) {
        baskets.push(basket);
    }
    return `(${baskets.join(',')})`;
};
module.exports = { getBasketsByUserId, addOrUpdateBasketByUserId, deleteBasketsByBasketId, checkIfBasketExists };
