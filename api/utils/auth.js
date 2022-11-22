const jwt = require('jsonwebtoken');

const { userService } = require('../services');

const loginRequired = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        const error = new Error('NEED_ACCESS_TOKEN');
        error.statusCode = 401;

        return res.status(error.statusCode).json({ message: error.message });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userService.getUserById(decoded.id);

    if (!user) {
        const error = new Error('USER_DOES_NOT_EXIST');
        error.statusCode = 404;
        return res.status(error.statusCode).json({ message: error.message });
    }

    req.user = user.id;
    next();
};

module.exports = { loginRequired };
