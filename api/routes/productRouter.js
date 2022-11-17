const express = require('express');

const { productController } = require('../controllers');

const productRouter = express.Router();

productRouter.get('/:productId', productController.getProductByProductId);

module.exports = { productRouter };
