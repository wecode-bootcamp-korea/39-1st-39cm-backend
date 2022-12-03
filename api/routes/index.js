const express = require('express');

const { productRouter } = require('./productRouter');
const { userRouter } = require('./userRouter');
<<<<<<< HEAD
const { reviewRouter } = require('./reviewRouter');
=======
const { likeRouter } = require('./likeRouter');
const { cartRouter } = require('./cartRouter');
const { checkoutRouter } = require('./checkoutRouter');
>>>>>>> main

const router = express.Router();

router.use('/products', productRouter);
router.use('/auth', userRouter);
<<<<<<< HEAD
router.use('/reviews', reviewRouter);
=======
router.use('/likes', likeRouter);
router.use('/cart', cartRouter);
router.use('/checkout', checkoutRouter);
>>>>>>> main

module.exports = { router };
