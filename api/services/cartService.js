const { cartDao, productDao } = require('../models');
const { CustomError } = require('../utils/error');

const getBasketsByUserId = async (userId) => {
    return await cartDao.getBasketsByUserId(userId);
};

const addOrUpdateBasketByUserId = async (userId, productId, amount) => {
    if (!(await productDao.CheckIfProductExists(productId))[0]) throw new CustomError('PRODUCT_DOES_NOT_EXIST', 404);
    const [row] = await cartDao.getBasketByUserIdAndProductId(userId, productId);
    if (!row && amount) await cartDao.addBasket(userId, productId, amount);
    if (!amount) await cartDao.deleteBasketByBasketId(row?.basketId, userId);
    if (row && amount) await cartDao.updateBasket(row.basketId, userId, amount);
    return [await cartDao.getBasketByUserIdAndProductId(userId, productId)];
};
module.exports = { getBasketsByUserId, addOrUpdateBasketByUserId };
