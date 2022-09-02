const ProductModel = require('../models/product');
const Category = require('../models/category');


exports.getProducts = (req, res, next) => {
    ProductModel
    .find()
    .populate('categoryId')
    .then(products => {
        console.log('products', products);
        res.render('list-products', {
            pageTitle: "My Store - List Products",
            products: products
        });
    });
}

exports.getAddProducts = (req, res, next) => {
    Category
    .find()
    .then(categories => {
        res.render('add-product', {
            pageTitle: "My Store - Add Products",
            categories: categories
        })
    });
}

exports.postProducts = (req, res, next) => {
    const product = new ProductModel({
        title: req.body.name,
        price: +req.body.price,
        imageUrl: '',
        categoryId: req.body.categoryId
    });
    product.save().then(addedProduct => {
        res.redirect('/shopping/list-products');
    });
}