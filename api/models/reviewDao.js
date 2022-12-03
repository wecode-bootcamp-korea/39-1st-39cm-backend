const { AppDataSource } = require('./data_source');

const getReviewUserId = async (user_id) => {
    const result = await AppDataSource.query(
        `
		SELECT 
           *
		FROM reviews
		WHERE user_id = ?`,
        [user_id]
    );
    return result[0];
};

const createReview = async (user_id, product_id, title, content, image_url, rating) => {
    await AppDataSource.query(
        `INSERT INTO reviews(
            user_id,
            product_id,
            title,
            content,
            image_url,
            rating
        ) VALUES(?,?,?,?,?,?);
        `,
        [user_id, product_id, title, content, image_url, rating]
    );
};
const modifyReview = async (user_id, title, content, image_url, rating, review_id) => {
    const a = await AppDataSource.query(
        `UPDATE reviews
            SET
            title = ?,
            content = ?,
            image_url = ?,
            rating = ?
         WHERE id = ?
        `,
        [title, content, image_url, rating, review_id]
    );
    const [result] = await AppDataSource.query(
        `SELECT
                *       
            FROM reviews
            WHERE id = ?
            `,
        [review_id]
    );

    return result;
};

const deleteReview = async (user_id, reviewId) => {
    await AppDataSource.query(
        `DELETE FROM reviews
        WHERE id = ?`,
        [reviewId]
    );
};

module.exports = { getReviewUserId, createReview, modifyReview, deleteReview };
