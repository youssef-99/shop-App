const Product = require('../models/product');
const { checkout } = require('../routes/shop');

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(
        products => {
            res.render('shop/product-list', { prods: products, docTitle: 'All Products', path: '/products', title: 'All Products' });
        }
    ).catch(err => {
        console.log(err);
    });
}

exports.getProduct = ((req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        res.render('shop/product-detail', {
            product: product,
            title: product.title,
            path: '/products'
        });
    }).catch(err => {
        console.log(err);
    });
});
exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(
        products => {
            res.render('shop/index', { prods: products, docTitle: 'All Products', path: '/products', title: 'All Products' });
        }
    ).catch(err => {
        console.log(err);
    });
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                title: 'Your Cart',
                products: products
            });
        }).catch(err => {
            console.log(err);
        });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(product => {
        return req.user.addToCart(product);
    })
        .then(result => {
            res.redirect('/cart');
            //console.log(result);
        });
    // let fetchedCart;
    // let newQuantity = 1;
    // req.user.getCart()
    //     .then(cart => {
    //         fetchedCart = cart;
    //         cart.getProducts({ where: { id: prodId } })
    //             .then(products => {
    //                 let product;
    //                 if (products.length > 0) {
    //                     product = products[0];
    //                 }
    //                 if (product) {
    //                     let oldQuantity = product.cartItem.quantity;
    //                     newQuantity = oldQuantity + 1;
    //                     return product;
    //                 }
    //                 return Product.findByPk(prodId);
    //             })
    //             .then(product => {
    //                 return fetchedCart.addProduct(
    //                     product,
    //                     { through: { quantity: newQuantity } }
    //                 );
    //             })
    //             .then(() => {
    //                 res.redirect('/cart');
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.deleteItemFromCart(prodId)
        .then(() => {
            console.log('Item deleted');
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getCheckOut = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        title: 'Check out'
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        title: 'Your Order'
    })
}