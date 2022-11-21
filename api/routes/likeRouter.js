const express = require('express');
const { likeController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const likeRouter = express.Router();

likeRouter.post('', loginRequired, likeController.createLike);
likeRouter.delete('/:productId', loginRequired, likeController.deleteLike);

module.exports = { likeRouter };
