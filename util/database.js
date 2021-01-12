const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://youssef:123456$$@cluster.xzemw.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connection Established');
            _db = client.db('shop');
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database Found!';
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

