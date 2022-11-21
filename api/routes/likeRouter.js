const express = require('express');
const { likeController } = require('../controllers');
const { loginRequired } = require('../util/auth');

const likeRouter = express.Router();

likeRouter.post('', loginRequired, likeController.createLike);
likeRouter.delete('/:productId', loginRequired, likeController.deleteLike);

module.exports = { likeRouter };
