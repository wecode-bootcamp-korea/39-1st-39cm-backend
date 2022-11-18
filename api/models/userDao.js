const { AppDataSource } = require('./data_source');

const getUserByEmail = async (email) => {
    const result = await AppDataSource.query(
        `
		SELECT 
           *
		FROM users
		WHERE email = ?`,
        [email]
    );
    return result[0];
};

const getUserById = async (id) => {
    const result = await AppDataSource.query(
        `
		SELECT 
           *
		FROM users
		WHERE id = ?`,
        [id]
    );
    return result[0];
};

const createUser = async (name, email, password, gender, address) => {
    await AppDataSource.query(
        `INSERT INTO users(
            name,
            email,
            password,
            gender_id,
            address
        ) VALUES(?,?,?,?,?);
        `,
        [name, email, password, gender, address]
    );
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
};
