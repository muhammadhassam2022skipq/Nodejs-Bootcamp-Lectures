const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mainRoutes = require('./routes/main-routes');
const shoppingRoutes = require('./routes/shopping-routes');

const databaseUtil = require('./utl/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRoutes);
app.use('/shopping', shoppingRoutes);
app.use((req, res, next) => {
    res.render('not-found');
});

databaseUtil.mongoConnect(() => {
    app.listen(3000, () => {
        console.log('Started listening at port 3000.');
    });
}); 