const { productDao } = require('../models');
const getProductByProductId = async (productId) => {
    return await productDao.getProductByProductId(productId);
};

module.exports = {
    getProductByProductId,
};
