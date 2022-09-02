const express = require('express');
const {check, body} = require('express-validator/check');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const multerStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'avatars/');
    },
    filename: (req, file, callBack) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        req.uploadedAvatarName = uniqueSuffix + '-' + file.originalname;
        callBack(null, uniqueSuffix + '-' + file.originalname);
    }
})

const avatarUploader = multer({storage: multerStorage});

const { 
    getSignupForm,
    postSignupForm,
    getSigninForm,
    postSigninForm,
    getAvatar
} = require('../controllers/accounts-controller');

const router = express.Router();

router.get('/avatars/:userId', getAvatar);
router.get('/read-file', (req, res) => {
    const text = fs.readFileSync(path.join(__dirname, '../', 'test-file.txt'));
    res.setHeader('Content-Type', 'text').send(text);
});
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
    avatarUploader.single('avatar'),
    (req, res, next) => {
        console.log('selected file', req.file);
        next();
    },
    // check('email').isEmail().withMessage('Please enter a valid email address.').custom((value, {req}) => {
    //     if(value.indexOf('test') > -1) throw new Error('This is a fobidden email address');
    // }),
    // body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
    // .isLength({min: 5})
    // .isAlphanumeric(),
    // body('confirmPassword').custom((value, {req}) => {
    //     if(value !== req.body.password) throw new Error('Password doen not match.');
    // }),
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