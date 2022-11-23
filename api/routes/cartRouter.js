const express = require('express');

const { cartController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const cartRouter = express.Router();

cartRouter.get('', loginRequired, cartController.getBasketsByUserId);
cartRouter.post('', loginRequired, cartController.addOrUpdateBasketByUserId);
cartRouter.delete('', loginRequired, cartController.deleteBasketsByBasketId);

module.exports = { cartRouter };
