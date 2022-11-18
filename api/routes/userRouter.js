const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp);

module.exports = { userRouter };
