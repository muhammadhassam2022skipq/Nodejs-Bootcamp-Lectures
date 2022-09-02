const ProductModel = require('../models/product');
const products = [];

exports.getProducts = (req, res, next) => {
    res.render('list-products', {
        pageTitle: "My Store - List Products",
        products: products
    })
}

exports.getAddProducts = (req, res, next) => {
    res.render('add-product', {
        pageTitle: "My Store - Add Products"
    })
}

exports.postProducts = (req, res, next) => {
    const p = new ProductModel.Product();
    p.name = req.body.name;
    p.price = req.body.price;
    products.push(p);

    res.redirect('/shopping/list-products')
}