const express = require('express');

const router = express.Router();

router.get('/products', (req, res, next) => {
    let products = '<h1>Products</h1>';
    res.send(products);
});

module.exports = router;