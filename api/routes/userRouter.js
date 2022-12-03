const express = require('express');
const { userController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const userRouter = express.Router();

userRouter.post('/login', userController.signIn);
userRouter.post('/signup', userController.signUp);
<<<<<<< HEAD
=======
userRouter.get('/user/info', loginRequired, userController.getUserInformation);
userRouter.get('/user/ordered', loginRequired, userController.getUserOrdered);
>>>>>>> main

module.exports = { userRouter };
