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
    const product = new Product(title, price, description, imageUrl)
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
    req.user.getProducts({ where: { id: prodId } }).then(
        products => {
            const product = products[0];
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
    Product.findAll().then(
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
    Product.findByPk(req.body.productId).then(product => {
        product.title = req.body.title,
            product.imageUrl = req.body.imageUrl,
            product.price = req.body.price,
            product.description = req.body.description
        return product.save();
    }).then(result => {
        console.log('UPDATED');
        res.redirect('/admin/products');
    })
        .catch(err => {
            console.log(err);
        });
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId).
        then(product => {
            return product.destroy();
        }).
        then(result => {
            console.log('DESTROED!');
            res.redirect('/admin/products');
        }).
        catch(err => {
            console.log(err);
        });
}

