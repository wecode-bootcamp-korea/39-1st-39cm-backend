const { AppDataSource } = require('./data_source');

const createLike = async (user_id, product_id) => {
    await AppDataSource.query(
        `INSERT INTO likes(
                user_id,
                product_id
            ) VALUES (?, ?);
            `,
        [user_id, product_id]
    );
};

module.exports = { createLike };
