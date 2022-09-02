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
    getCustomerById,
    addCustomer
} = require('../controllers/accounts-controller');

const router = express.Router();

router.get('/get/:id', getCustomerById);
router.post('/add', addCustomer);

module.exports = router;