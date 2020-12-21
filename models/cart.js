const fs = require('fs');
const path = require ('path');


const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart{
    static addProduct(id, productPrice){
        let cart = {product: [], totalPrice: 0}
        fs.readFile(p, (err, fileContent) => {
            if(!err){
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.product.findIndex(prod => prod.id === id);
            const existingProduct = cart.product[existingProductIndex];
            let updatedProduct;
            console.log(existingProduct);

            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.product = [...cart.product];
                cart.product[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id: id, qty: 1};
                cart.product = [...cart.product, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return;
            }
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.product.find(prod => prod.id === id);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.product = updatedCart.product.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }
    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }else{
                cb(cart);
            }
        });
    }
}
