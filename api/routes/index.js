const express = require('express');

const { userRouter } = require('./userRouter');
const { likeRouter } = require('./likeRouter');

const router = express.Router();

router.use('/auth', userRouter);
router.use('/likes', likeRouter);

module.exports = { router };
