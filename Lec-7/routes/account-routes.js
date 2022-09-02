const express = require('express');
const { 
    getSignupForm,
    postSignupForm,
    getSigninForm,
    postSigninForm
} = require('../controllers/accounts-controller');

const router = express.Router();

router.get('/signup', getSignupForm);
router.post('/signup', postSignupForm)

router.get('/signin', getSigninForm);
router.post('/signin', postSigninForm);

module.exports = router;