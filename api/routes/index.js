const express = require('express');

const { productRouter } = require('./productRouter');
const { userRouter } = require('./userRouter');
const { likeRouter } = require('./likeRouter');

const router = express.Router();

router.use('/products', productRouter);
router.use('/auth', userRouter);
router.use('/likes', likeRouter);

module.exports = { router };
