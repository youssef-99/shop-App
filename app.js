const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const productController = require('./controllers/error.js');
const path = require('path');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findById('5ffd4e93925d2867dc0a64ee')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => { console.log(err); });
});
app.use('/admin', adminRouter);
app.use('/', shopRouter);
app.use(productController.notFound);

mongoConnect(() => {
    app.listen(3000);
});

