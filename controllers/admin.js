const Product = require('../models/product');

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
    const product = new Product(null, title, imageUrl, price, description);
    product.save().then(() => {
        res.redirect('/');
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
    Product.findById(prodId, product => {
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
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            title: 'Admin Product',
            path: '/admin/products'
        })
    });
}

exports.postEditProduct = (req, res, next) => {
    console.log(req.body.productId);
    const updatedProduct = new Product(
        req.body.productId,
        req.body.title,
        req.body.imageUrl,
        req.body.price,
        req.body.description
    );
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}

