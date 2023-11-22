const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check } = require('express-validator');
const notLogged = require('../../middlewares/notLogged.js');
const adminCheck = require('../../middlewares/adminCheck');

// ************ Controller Require ************
const apiUsersController = require('../../controllers/api/apiUsersController.js');

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

//router.get('/login', notLogged, apiUsersController.loginForm);

//router.post('/login', notLogged, apiUsersController.login);

//router.get('/logout', usersController.logout);

//router.get('/register', notLogged, apiUsersController.registerForm);

router.get('/user/:uuid', apiUsersController.profile);

//router.post('/', notLogged, fileUpload.single('profile-picture'), validateForm, apiUsersController.register);


router.get('/users', apiUsersController.userList);

router.get('/adminusers', apiUsersController.adminUsers);

module.exports = router;