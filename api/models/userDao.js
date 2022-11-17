const {AppDataSource} = require('./data_source')

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
        if(err.sqlMessage.includes('Duplicate')){
            throw new Error('DUPLICATE_EAMIL');
        } else {
            throw new Error('DATABASE ERROR')
        }
        }
}


module.exports = {
    createUser
}