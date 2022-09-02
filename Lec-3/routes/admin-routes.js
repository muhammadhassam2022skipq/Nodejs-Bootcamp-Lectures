const express = require('express');

const router = express.Router();

const products = [
    {name: "Product A", price: 2.5},
    {name: "Product B", price: 3.5},
    {name: "Product C", price: 4.5}
];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: "My Store - Add Product"
    })
});

router.post('/add-product', (req, res, next) => {
    products.push({
        name: req.body.product,
        price: req.body.price
    })
    res.redirect('/admin/products');
});

router.get('/products', (req, res, next) => {
    res.render('products', {
        pageTitle: "My Store - Products",
        products: products
    })
});

module.exports = router;