const { productService } = require('../services');

const getProductByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        if (isNaN(productId)) {
            const err = new Error('BAD_REQUEST');
            err.statusCode = 400;
            throw err;
        }
        const product = await productService.getProductByProductId(productId);
        res.status(200).json({ product: product });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts(
            req.query.limit,
            req.query.offset,
            req.query.sort,
            req.query.min_price,
            req.query.max_price,
            req.query.color,
            req.query.category,
            req.query.brand,
            req.query.product_gender
        );
        res.status(200).json({ products: products });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};
module.exports = {
    getProductByProductId,
    getProducts,
};
