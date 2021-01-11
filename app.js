const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
// const shopRouter = require('./routes/shop');
const productController = require('./controllers/error.js');
const path = require('path');
const mongoConnect = require('./util/database').mongoConnect;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch(err => { console.log(err); });
    next();
});
app.use('/admin', adminRouter);
// app.use('/', shopRouter);
app.use(productController.notFound);

mongoConnect(() => {
    app.listen(3000);
});

