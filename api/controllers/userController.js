const {userService} = require('../services');

const signUp = async (req,res) => {
    try {
        const {name,email,password,gender,address} = req.body;

        if(!name || !email || !password || !gender || !address) {
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        if(gender !=='남자' || gender !== '여자'){
            return res.status(400).json({message: 'KEY_ERROR'});
        }

        await userService.signUp(name,email,password,gender,address);
        return res.status(201).json({
            message : 'SIGNUP_SUCCESS'
        })
    } catch(err){
        return res.status(err.satusCode || 500).json({message : err.message});
    }
};

module.exports = {
    signUp
}