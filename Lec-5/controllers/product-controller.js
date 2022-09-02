const ProductModel = require('../models/product');
const mongodb = require('mongodb');
const products = [];

exports.getProducts = (req, res, next) => {
    const product = new ProductModel.Product();
    product.fetchAll().toArray().then(products => {
        res.render('list-products', {
            pageTitle: "My Store - List Products",
            products: products
        });
    }).catch(err => {
        res.send(err);
    });
}

exports.getAddProducts = (req, res, next) => {
    res.render('add-product', {
        pageTitle: "My Store - Add Products"
    })
}

exports.postProducts = (req, res, next) => {
    const p = new ProductModel.Product();
    p._id = new mongodb.ObjectId();
    p.name = req.body.name;
    p.price = req.body.price;
    //products.push(p);
    p.save().then(() => {
        res.redirect('/shopping/list-products');
    });
}