const { mypageService } = require('../services');

const getUserInformation = async (req, res) => {
    try {
        const userId = req.user;
        const userInfo = await mypageService.getUserInformation(userId);
        return res.status(200).json({ userInfo });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const getUserOrdered = async (req, res) => {
    const userId = req.user;
    const userOrdered = await mypageService.getUserOrdered(userId);

    return res.status(200).json({ userOrdered });
};

module.exports = { getUserInformation, getUserOrdered };
