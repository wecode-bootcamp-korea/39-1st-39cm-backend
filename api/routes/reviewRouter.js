const express = require('express');
const { reviewController } = require('../controllers');

const reviewRouter = express.Router();

reviewRouter.post('', reviewController.createReview);

module.exports = { reviewRouter };
