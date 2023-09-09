// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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

let fileUpload = multer({ storage: multerDiskStorage });

router.get('/login', usersController.loginForm);

router.post('/login', usersController.login);

router.get('/register', usersController.registerForm);

router.post('/', fileUpload.single('profile-picture'), usersController.register);

module.exports = router;
