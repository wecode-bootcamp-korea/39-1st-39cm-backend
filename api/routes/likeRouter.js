const express = require('express');
const { likeController } = require('../controllers');

const likeRouter = express.Router();

likeRouter.post('', likeController.createLike);
likeRouter.delete(':productId', likeController.deleteLike);

module.exports = { likeRouter };
