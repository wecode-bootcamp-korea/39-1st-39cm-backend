const express = require('express');

const { checkoutController } = require('../controllers');

const checkoutRouter = express.Router();

//checkoutRouter.get('', loginrequired, checkoutController.orderItemsByUserId );
checkoutRouter.post('', checkoutController.orderItemsByUserId);

module.exports = { checkoutRouter };
