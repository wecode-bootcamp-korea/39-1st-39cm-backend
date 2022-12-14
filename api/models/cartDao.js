const { appDataSource } = require('./data_source');

const addBasket = async (userId, productId, amount) => {
    return await appDataSource.query(
        `INSERT INTO baskets(
            amount,
            product_id,
            user_id
        ) VALUES (?,?,?);
        `,
        [amount, productId, userId]
    );
};

const deleteAllBasketsByUserId = async (userId) => {
    return await appDataSource.query(
        `
        DELETE FROM baskets
        WHERE user_id = ?;
        `,
        [userId]
    );
};

const deleteBasketsByBasketId = async (basketIds) => {
    return await appDataSource.query(
        `
        DELETE FROM baskets
        ?
        `,
        [basketIds]
    );
};

const deleteBasketByProductIdAndUserId = async (userId, productId) => {
    return await appDataSource.query(
        `
        DELETE FROM baskets
        WHERE user_id = ? AND product_id = ?
        `,
        [userId, productId]
    );
};

const getBasketsByUserId = async (userId) => {
    const rows = await appDataSource.query(
        `
        SELECT
            p.name productName,
            p.id productId,
            p.price productPrice,
            b.amount amount,
            b.id basketId,
            p.brand_name brandName,
            (
                SELECT
                    JSON_ARRAYAGG(pi.image_url) images
                FROM product_images pi
                WHERE pi.product_id = b.product_id
                GROUP BY pi.product_id
            ) images
        FROM baskets b
        JOIN products p ON p.id = b.product_id
        JOIN users u ON u.id = b.user_id
        WHERE u.id = ?
        `,
        [userId]
    );
    return rows;
};

const getBasketByUserIdAndProductId = async (userId, productId) => {
    const row = await appDataSource.query(
        `SELECT
            id basketId, amount
        FROM baskets
        WHERE user_id= ? AND product_id = ?;
        `,
        [userId, productId]
    );
    return row;
};
const updateBasket = async (basketId, userId, amount) => {
    return await appDataSource.query(
        `
        UPDATE baskets
        SET amount = ?
        WHERE id = ? AND user_id = ?
        `,
        [amount, basketId, userId]
    );
};

const getPriceOfBasketByBasketId = async (basketId, userId) => {
    return await appDataSource.query(
        `SELECT
            (b.amount * p.price) totalPrice
        FROM baskets b
        JOIN products p ON b.product_id = p.id
        WHERE b.id = ? AND b.user_id = ?
        `,
        [basketId, userId]
    );
};

const getBasketByBasketId = async (basketId, userId) => {
    const row = await appDataSource.query(
        `SELECT
            id
        FROM baskets
        WHERE id = ? AND user_id = ?
        `,
        [basketId, userId]
    );
    return row;
};

module.exports = {
    addBasket,
    deleteAllBasketsByUserId,
    deleteBasketsByBasketId,
    getBasketsByUserId,
    updateBasket,
    getBasketByUserIdAndProductId,
    getPriceOfBasketByBasketId,
    getBasketByBasketId,
    deleteBasketByProductIdAndUserId,
};
