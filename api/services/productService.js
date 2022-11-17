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

    let clause = `WHERE `;
    if (minPrice) clause += `p.price > ${minPrice} AND `;
    if (maxPrice) clause += `p.price < ${maxPrice} AND `;
    if (color) clause += `p.color = ${color} AND `;
    if (category) clause += `c.name = ${category} AND `;
    if (brand) clause += `p.brand_name = ${brand} AND `;
    if (productGender) clause += `p.product_gender = ${productGender} AND `;
    clause = clause.slice(0, clause.length - 4);
    return {
        toSqlString: function () {
            return clause;
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
    if (!limit) {
        return {
            toSqlString: function () {
                return ``;
            },
        };
    }
    if (!offset) {
        return {
            toSqlString: function () {
                return `LIMIT ${limit} `;
            },
        };
    }

    return {
        toSqlString: function () {
            return `LIMIT ${limit} OFFSET ${offset} `;
        },
    };
};

module.exports = {
    getProductByProductId,
    getProducts,
};
