const { appDataSource } = require('./data_source');

const getUserByEmail = async (email) => {
    const result = await appDataSource.query(
        `SELECT 
           *
		FROM users
		WHERE email = ?
        `,
        [email]
    );
    return result[0];
};

const getUserById = async (id) => {
    const result = await appDataSource.query(
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
    await appDataSource.query(
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

const getPointByUserId = async (userId) => {
    const point = await appDataSource.query(
        `SELECT
            point
        FROM users
        WHERE id = ?
        `,
        [userId]
    );
    return point[0];
};

const updatePointByUserId = async (point, userId) => {
    return await appDataSource.query(
        `
        UPDATE users
        SET point = ?
        WHERE id = ?
        `,
        [point, userId]
    );
};

module.exports = {
    createUser,
    getUserByEmail,
    getPointByUserId,
    updatePointByUserId,
    getUserById,
};
