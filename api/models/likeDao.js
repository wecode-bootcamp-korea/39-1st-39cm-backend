const { appDataSource } = require('./data_source');

const getLikeUserId = async (userId, productId) => {
    const result = await appDataSource.query(
        `
		SELECT 
           likes.user_id AS userId,
           likes.product_id AS prodcutId
		FROM likes
		WHERE user_id =? AND product_id = ?`,
        [userId, productId]
    );
    return result[0];
};

const createLike = async (userId, productId) => {
    await appDataSource.query(
        `INSERT INTO likes(
                user_id, 
                product_id
            ) VALUES (?, ?);
            `,
        [userId, productId]
    );

    return await getLikeUserId(userId, productId);
};

const deleteLike = async (userId, productId) => {
    const result = await getLikeUserId(userId, productId);
    await appDataSource.query(
        `DELETE FROM likes
        WHERE user_id = ? AND product_id = ?`,
        [userId, productId]
    );

    return result;
};

module.exports = { createLike, deleteLike, getLikeUserId };
