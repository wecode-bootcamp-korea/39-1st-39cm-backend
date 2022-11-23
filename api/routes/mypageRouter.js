const express = require('express');

const { mypageController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const mypageRouter = express.Router();

mypageRouter.get('/user/info', loginRequired, mypageController.getUserInformation);
mypageRouter.get('/user/ordered', loginRequired, mypageController.getUserOrdered);

module.exports = { mypageRouter };
