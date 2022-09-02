const express = require('express');

const router = express.Router();

const products = [
    {name: "Product A", price: 2.5},
    {name: "Product B", price: 3.5},
    {name: "Product C", price: 4.5}
];


router.get('/products', (req, res, next) => {
    res.render('products', {
        pageTitle: "My Store - Products",
        products: products
    })
});
module.exports = router;