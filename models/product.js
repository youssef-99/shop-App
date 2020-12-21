const e = require('express');
const { json } = require('express');
const fs = require('fs');
const path = require('path');
const Cart = require('./cart')

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent));
    });
};
module.exports = class Product {
    constructor(id, title, imgeUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imgeUrl = imgeUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile(
            products => {
                console.log(this.id);
                if (this.id) {
                    const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                    const updatedProduct = [...products];
                    updatedProduct[existingProductIndex] = this;
                    fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                        console.log(err);
                    });
                    console.log('doneeeeeeeeeee');
                } else {
                    this.id = Math.random().toString();
                    products.push(this);
                    fs.writeFile(p, JSON.stringify(products), (err) => {
                        console.log(err);
                    });
                }

            });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static deleteById(id){
        getProductsFromFile(prods => {
            const product = prods.find(prod => prod.id === id);
            const updatedProduct = prods.filter(product => product.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                if(!err){
                    Cart.deleteProduct(id, product.price);
                    console.log('done');
                }
            });
        });
    }
    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(product => product.id === id);
            cb(product);
        });
    }
}