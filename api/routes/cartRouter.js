const express = require('express');

const { cartController } = require('../controllers');

const cartRouter = express.Router();

//cartRouter.get('', loginrequired, cartController.getBasketsByUserId);
cartRouter.get('', cartController.getBasketsByUserId);
//cartRouter.post('', loginrequired, cartController.addOrUpdateBasketByUserId);
cartRouter.post('', cartController.addOrUpdateBasketByUserId);

cartRouter.delete('', cartController.deleteBasketsByBasketId);
module.exports = { cartRouter };
