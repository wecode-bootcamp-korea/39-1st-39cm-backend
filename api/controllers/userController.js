const {userService} = require('../services');

const signIn = async (req, res) => {
	const { email, password } = req.body


	try {
		const token = await userService.signIn(email, password)
		res.status(200).json({ token: token })
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

module.exports = {
    signIn
}