const express = require('express');
const { likeController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const likeRouter = express.Router();

likeRouter.get('/product/:productId', loginRequired, likeController.checkLike);
likeRouter.post('/product/:productId', loginRequired, likeController.createLike);
likeRouter.delete('/product/:productId', loginRequired, likeController.deleteLike);

module.exports = { likeRouter };
