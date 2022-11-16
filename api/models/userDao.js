const {AppDataSource} = require('../models/data_source')

const createUser = async(name,email,password,gender,address) =>{
    try {
        return await AppDataSource.query(
            `INSERT INTO users(
                name,
                email,
                password,
                gender_id,
                address
            ) VALUES(?,?,?,?,?);
            `,
            [name,email,password,gender,address]
        ); 
    } catch(err) {
        console.log(err)
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createUser
}