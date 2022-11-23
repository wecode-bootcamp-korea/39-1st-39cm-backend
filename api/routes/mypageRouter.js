const express = require('express');

const { mypageController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const mypageRouter = express.Router();

mypageRouter.get('/user', loginRequired, mypageController.getUserInformation);

module.exports = { mypageRouter };
