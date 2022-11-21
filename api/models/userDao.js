const { AppDataSource } = require('./data_source');

const getUserByEmail = async (email) => {
    const result = await AppDataSource.query(
        `
		SELECT 
           *
		FROM users
		WHERE email = ?
        `,
        [email]
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

const getPointByUserId = async (userId) => {
    const point = await AppDataSource.query(
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
    await AppDataSource.query(
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
};
