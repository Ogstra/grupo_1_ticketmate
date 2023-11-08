// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check } = require('express-validator');
const notLogged = require('../middlewares/notLogged');
const adminCheck = require('../middlewares/adminCheck');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

// ************ Configuracion de Multer ************
let multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/img/profile-pictures'); //ajustar ruta de imagenes
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = file.originalname.substring(0, file.originalname.lastIndexOf('.')) + '-' + Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
});

const validateForm = [
    check('username')
        .notEmpty().withMessage('Debes completar este campo'),

    check('email')
        .isEmail().withMessage('Debes ingresar un email válido.'),

    check('firstName')
        .notEmpty().withMessage('Debes completar este campo'),

    check('lastName')
        .notEmpty().withMessage('Debes completar este campo'),

    check('password')
        .notEmpty().withMessage('Debes completar este campo'),

    check('passwordConfirm')
        .custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas deben coincidir')
]

let fileUpload = multer({ storage: multerDiskStorage });

router.get('/login', notLogged, usersController.loginForm);

router.post('/login', notLogged, usersController.login);

router.get('/logout', usersController.logout);

router.get('/register', notLogged, usersController.registerForm);

router.get('/profile/:uuid',usersController.profile);

router.post('/', notLogged, fileUpload.single('profile-picture'), validateForm, usersController.register);

router.get('/users',adminCheck, usersController.userList);

module.exports = router;
