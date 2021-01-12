const Product = require('../models/product');
const mongodb = require('mongodb');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product',
        {
            path: '/admin/add-product',
            title: 'Add Product',
            editing: false
        });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, description, imageUrl, null, req.user._id)
    product.save().then(result => {
        res.redirect('/');
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.render('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId).then(
        product => {
            if (!product) {
                return res.render('/');
            }
            res.render('admin/edit-product',
                {
                    path: '/admin/edit-product',
                    title: 'Edit Product',
                    editing: editMode,
                    product: product
                });
        }
    ).catch(err => {
        console.log(err);
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(
        products => {
            res.render('admin/products', {
                prods: products,
                title: 'Admin Product',
                path: '/admin/products'
            })
        }
    ).catch(err => {
        console.log(err);
    });
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body._id;
    console.log(req.body.price);
    const product = new Product(req.body.title, req.body.price, req.body.description, req.body.imageUrl, prodId);
    product.save()
        .then(result => {
            console.log('UPDATED');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId).
        then(result => {
            console.log('DESTROED!');
            res.redirect('/admin/products');
        }).
        catch(err => {
            console.log(err);
        });
}

