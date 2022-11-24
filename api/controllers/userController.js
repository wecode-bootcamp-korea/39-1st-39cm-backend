const { userService } = require('../services');
const { CustomError } = require('../utils/error');

const signUp = async (req, res) => {
    try {
        const { name, email, password, gender, address } = req.body;

        if (!name || !email || !password || !gender || !address) {
            throw new CustomError('KEY_ERROR', 400);
        }

        if (gender !== '남자' && gender !== '여자') {
            throw new CustomError('KEY_ERROR', 400);
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
    console.log(email);
    try {
        const token = await userService.signIn(email, password);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = {
    signUp,
    signIn,
};
