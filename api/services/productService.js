const { productDao } = require('../models');
const getProductByProductId = async (productId) => {
    return await productDao.getProductByProductId(productId);
};

const getProducts = async (limit, offset, sort, minPrice, maxPrice, color, category, brand, productGender) => {
    const whereClause = buildWhereClause(minPrice, maxPrice, color, category, brand, productGender);
    const orderClause = buildOrderClause(sort);
    const limitClause = buildLimitAndOffset(limit, offset);
    return await productDao.getProducts(whereClause, orderClause, limitClause);
};

const buildWhereClause = (minPrice, maxPrice, color, category, brand, productGender) => {
    if (!(minPrice || maxPrice || color || category || brand || productGender)) {
        return {
            toSqlString: function () {
                return ``;
            },
        };
    }
    const clause = [];
    if (minPrice) clause.push(`p.price > ${minPrice}`);
    if (maxPrice) clause.push(`p.price < ${maxPrice}`);
    if (color) clause.push(`p.color = '${color}'`);
    if (category) clause.push(`p.category_id = ${category}`);
    if (brand) clause.push(`p.brand_name = '${brand}'`);
    if (productGender) clause.push(`p.product_gender_id = ${productGender}`);
    const whereClauses = `WHERE ${clause.join(` AND `)}`;
    return {
        toSqlString: function () {
            return whereClauses;
        },
    };
};

const buildOrderClause = (sort) => {
    if (!sort) {
        return {
            toSqlString: function () {
                return ` `;
            },
        };
    }
    switch (sort) {
        case 'like':
            return {
                toSqlString: function () {
                    return `ORDER BY likeCount DESC `;
                },
            };
        case 'review':
            return {
                toSqlString: function () {
                    return `ORDER BY reviewCount DESC `;
                },
            };
        default:
            return {
                toSqlString: function () {
                    return `ORDER BY price DESC `;
                },
            };
    }
};
const buildLimitAndOffset = (limit, offset) => {
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    return {
        toSqlString: function () {
            return ` LIMIT ${limit} OFFSET ${offset} `;
        },
    };
};

module.exports = {
    getProductByProductId,
    getProducts,
};
