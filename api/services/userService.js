const {userDao} = require('../models')
const bcrypt = require('bcrypt')


const signUp = async(name,email,password,gender,address) => {

    const emailValidation = new RegExp(
        '^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$'
      );
      
      if (!emailValidation.test(email)) {
        const err = new Error('EMAIL_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
      }
    
    const pwValidation = new RegExp(
        '^(?=.*[a-z])(?=.*[0-9])(?=.{8,20})'
      );
      if (!pwValidation.test(password)) {
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
      }

      const user = await userDao.getUserByEmail(email);

      if(user){
          const err = new Error('DUPLICATE_EAMIL');
          err.statusCode = 400;
          throw err;
      }
    
    const genderCheck = () => {
      if(gender === '남자'){
        return gender = 1;
      } else if(gender === '여자'){
        return gender = 2;
      }
    };

    const hashedPassword = await bcrypt.hash(password, 10)

    const createUser = await userDao.createUser(
        name,
        email,
        hashedPassword,
        genderCheck(),
        address
    );

    return createUser

}


module.exports = {
    signUp
}