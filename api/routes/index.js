const express = require('express');

const { productRouter } = require('./productRouter');
const { userRouter } = require('./userRouter');
const { likeRouter } = require('./likeRouter');
const { cartRouter } = require('./cartRouter');
const { checkoutRouter } = require('./checkoutRouter');

const router = express.Router();

router.use('/products', productRouter);
router.use('/auth', userRouter);
router.use('/likes', likeRouter);
router.use('/cart', cartRouter);
router.use('/checkout', checkoutRouter);

module.exports = { router };
