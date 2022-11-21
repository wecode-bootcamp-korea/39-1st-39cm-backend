const { AppDataSource } = require('./data_source');

const addOrder = async (userId) => {
    await AppDataSource.query(
        `INSERT INTO 
        orders(
            user_id,
            order_status_id
        ) VALUES (?,1);
        `,
        [userId]
    );
    return await AppDataSource.query(`SELECT LAST_INSERT_ID() as orderId;`);
};

const addOrderItems = async (items) => {
    await AppDataSource.query(
        `INSERT INTO
        order_items(
            amount,
            order_id,
            product_id,
            order_items_status_id
        ) VALUES 
        ?
        `,
        [items]
    );
};

const deleteOrderByOrderId = async (orderId) => {
    await AppDataSource.query(
        `
        DELETE FROM orders
        WHERE id = ?;
        `,
        [orderId]
    );
};
const deleteOrderItemsByOrderId = async (orderId) => {
    await AppDataSource.query(
        `
        DELETE FROM order_items
        WHERE order_id = ?;
        `,
        [orderId]
    );
};
module.exports = { addOrder, addOrderItems, deleteOrderByOrderId, deleteOrderItemsByOrderId };
