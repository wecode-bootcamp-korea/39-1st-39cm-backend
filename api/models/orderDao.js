const { appDataSource } = require('./data_source');

const orderItemsTransaction = async (userId, orders, remainingPoint) => {
    return await appDataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.query(
            `INSERT INTO 
            orders(
                user_id,
                order_status_id
            ) VALUES (?,1);
            `,
            [userId]
        );

        const [{ orderId }] = await transactionalEntityManager.query(`SELECT LAST_INSERT_ID() as orderId;`);
        const items = {
            toSqlString: function () {
                return addOrderItemsQueryBuilder(orders, orderId);
            },
        };

        await transactionalEntityManager.query(
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

        await transactionalEntityManager.query(
            `
            UPDATE users
            SET point = ?
            WHERE id = ?
            `,
            [remainingPoint, userId]
        );
    });
};

const addOrderItemsQueryBuilder = (orders, orderId) => {
    const items = [];
    for (const item of orders) {
        items.push(`(${item.amount},${orderId},${item.productId},1)`);
    }
    return items.join(', ');
};

const deleteOrderByOrderId = async (orderId) => {
    return await appDataSource.query(
        `
        DELETE FROM orders
        WHERE id = ?;
        `,
        [orderId]
    );
};
const deleteOrderItemsByOrderId = async (orderId) => {
    return await appDataSource.query(
        `
        DELETE FROM order_items
        WHERE order_id = ?;
        `,
        [orderId]
    );
};
module.exports = { deleteOrderByOrderId, deleteOrderItemsByOrderId, orderItemsTransaction };
