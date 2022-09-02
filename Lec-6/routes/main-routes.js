const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    //res.send('<h1>sdfsdf</h1>')
    res.render('index', {
        pageTitle: 'My Store'
    });
})

module.exports = router;
