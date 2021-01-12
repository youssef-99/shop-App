const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const ObjectId = require('mongodb').ObjectID;

class Product {
    constructor(title, price, description, imageUrl, _id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = _id ? new ObjectId(_id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dpOp;

        if (this._id) {
            console.log(this.price)
            //update product
            dpOp = db.collection('products')
                .updateOne({ _id: this._id }, { $set: this });

        } else {
            dpOp = db.collection('products').insertOne({ title: this.title, price: this.price, description: this.description, imageUrl: this.imageUrl, userId: this.userId });
        }
        return dpOp
            .then(result => {
                console.log(this);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            })
    }

}


module.exports = Product;