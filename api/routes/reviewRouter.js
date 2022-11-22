const express = require('express');
const { reviewController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const reviewRouter = express.Router();

reviewRouter.post('', loginRequired, reviewController.createReview);
reviewRouter.delete('/:reviewId', loginRequired, reviewController.deleteReview);
reviewRouter.patch('', loginRequired, reviewController.modifyReview);

module.exports = { reviewRouter };
