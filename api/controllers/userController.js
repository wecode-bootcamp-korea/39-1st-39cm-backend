const { userService } = require('../services');

const signUp = async (req, res) => {
    try {
        const { name, email, password, gender, address } = req.body;

        if (!name || !email || !password || !gender || !address) {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }

        if (gender !== '남자' && gender !== '여자') {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }

        await userService.signUp(name, email, password, gender, address);
        return res.status(201).json({
            message: 'SIGNUP_SUCCESS',
        });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.signIn(email, password);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserInformation = async (req, res) => {
    try {
        const userId = req.user;
        const userInfo = await userService.getUserInformation(userId);
        return res.status(200).json({ userInfo });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const getUserOrdered = async (req, res) => {
    const userId = req.user;
    const userOrdered = await userService.getUserOrdered(userId);

    return res.status(200).json({ userOrdered });
};

module.exports = {
    signUp,
    signIn,
    getUserInformation,
    getUserOrdered,
};
