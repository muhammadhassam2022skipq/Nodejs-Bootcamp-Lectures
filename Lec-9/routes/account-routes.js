const express = require('express');
const {check, body} = require('express-validator/check');
const { 
    getSignupForm,
    postSignupForm,
    getSigninForm,
    postSigninForm
} = require('../controllers/accounts-controller');

const router = express.Router();

router.get('/signup', getSignupForm);
// const emailValidator = (req, res, next) => {
//     req.isValidRequest = true;
//     if(req.body.email
//         && req.body.email !== '') {
//             const email_check = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//             const isValidEmail = email_check.test(req.body.email);
//             if(!isValidEmail) {
//                req.isValidRequest = false;
//                req.validationError = 'Email is not valid';
//                next();
//             }
//         }
//         next();
// }
router.post(
    '/signup',
    check('email').isEmail().withMessage('Please enter a valid email address.').custom((value, {req}) => {
        if(value.indexOf('test') > -1) throw new Error('This is a fobidden email address');
    }),
    body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
    .isLength({min: 5})
    .isAlphanumeric(),
    body('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password) throw new Error('Password doen not match.');
    }),
    //emailValidator,
    postSignupForm
    )

router.get('/signin', getSigninForm);

const handler1 = (req, res, next) => {
    if(req.headers.abc) {
        next()
    } else {

    }
    console.log('I am handler 1');
    next();
}
const handler2 = (req, res, next) => {
    console.log('I am handler 2');   
    next();
}
const handler3 = (req, res, next) => {
    console.log('I am handler 3');
    next();
}
const handler4 = (req, res, next) => {
    console.log('I am handler 4');
    next();
}
router.post('/signin', handler1, handler2, handler3, handler4, postSigninForm);

module.exports = router;