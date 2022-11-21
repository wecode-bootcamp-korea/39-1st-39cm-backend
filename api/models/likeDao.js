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

const deleteLike = async (user_id, productId) => {
    await AppDataSource.query(
        `DELETE FROM likes
        WHERE user_id = ? AND product_id = ?`,
        [user_id, productId]
    );
};

module.exports = { createLike, deleteLike };
