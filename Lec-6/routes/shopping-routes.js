const express = require('express');

const productController = require('../controllers/product-controller');

const router = express.Router();


router.get('/list-products', productController.getProducts);
router.get('/add-product', productController.getAddProducts);
router.post('/add-product', productController.postProducts);

module.exports = router;
