const express = require('express');

const { checkoutController } = require('../controllers');

const checkoutRouter = express.Router();

//checkoutRouter.post('', loginrequired, checkoutController.orderItemsByUserId );
checkoutRouter.post('', checkoutController.orderItems);

module.exports = { checkoutRouter };
