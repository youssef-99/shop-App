const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const productController = require('./controllers/error.js');
const path = require('path');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => { console.log(err); });
});
app.use('/admin', adminRouter);
app.use('/', shopRouter);
app.use(productController.notFound);

Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });


sequelize.sync().
    then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ id: 1, name: 'youssef', email: 'youssefwilliam970@gmail.com' })
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

