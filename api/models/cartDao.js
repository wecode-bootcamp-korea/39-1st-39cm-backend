const { AppDataSource } = require('./data_source');

const addBasket = async (userId, productId, amount) => {
    await AppDataSource.query(
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
    await AppDataSource.query(
        `
        DELETE FROM baskets
        WHERE user_id = ?;
        `,
        [userId]
    );
};

const deleteBasketsByBasketId = async (basketIds) => {
    await AppDataSource.query(
        `
        DELETE FROM baskets
        ?
        `,
        [basketIds]
    );
};

const getBasketsByUserId = async (userId) => {
    const rows = await AppDataSource.query(
        `
        SELECT
            p.name productName,
            p.id productId,
            p.price price,
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
    const row = await AppDataSource.query(
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
    await AppDataSource.query(
        `
        UPDATE baskets
        SET amount = ?
        WHERE id = ? AND user_id = ?
        `,
        [amount, basketId, userId]
    );
};

const getPriceOfBasketByBasketId = async (basketId, userId) => {
    await AppDataSource.query(
        `SELECT
            (b.amount * p.price) totalPrice
        FROM baskets b
        JOIN products p ON b.product_id = p.id
        WHERE b.id = ? AND b.user_id = ?
        `,
        [basketId, userId]
    );
};

const checkIfBasketExists = async (basketId) => {
    const row = await AppDataSource.query(
        `SELECT
            id
        FROM baskets
        WHERE id = ?
        `,
        [basketId]
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
    checkIfBasketExists,
};
