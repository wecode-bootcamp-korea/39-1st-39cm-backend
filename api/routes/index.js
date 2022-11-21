const express = require('express');

const { productRouter } = require('./productRouter');
const { userRouter } = require('./userRouter');
const { reviewRouter } = require('./reviewRouter');

const router = express.Router();

router.use('/products', productRouter);
router.use('/auth', userRouter);
router.use('/review', reviewRouter);

module.exports = { router };
