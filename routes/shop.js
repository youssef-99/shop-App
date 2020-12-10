const express = require ('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const adminData = require('./admin');
const productController = require ('../controllers/products.js');

router.get('/', productController.getProducts);

module.exports = router;