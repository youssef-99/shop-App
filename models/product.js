const db = require('../util/database.js');
const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imgeUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imgeUrl = imgeUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        return db.execute('INSERT INTO products (title, price, imageUrl, discreption) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.imgeUrl, this.description]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static deleteById(id){

    }
    static findById(id) {
        return db.execute('SELECT * FROM products WHERE id = ?', [id]);
    } 
}