// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check } = require('express-validator');
const notLogged = require('../middlewares/notLogged');
const adminCheck = require('../middlewares/adminCheck');


// ************ Controller Require ************
const eventsController = require('../controllers/eventsController');

// ************ Configuracion de Multer ************
let multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/img/events'); //ajustar ruta de imagenes
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = file.originalname.substring(0, file.originalname.lastIndexOf('.')) + '-' + Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
});

// ************ Validaciones de creacion y edicion ************

const validateForm = [
    check('name')
        .notEmpty().withMessage('Debes ingresar un nombre'),

    check('price')
        .notEmpty().withMessage('Debes ingresar un precio'),

    check('stock')
        .notEmpty().withMessage('Debes ingresar un número de Stock'),

    check('date')
        .notEmpty().withMessage('Debes ingresar una fecha'),

    check('time')
        .notEmpty().withMessage('Debes elegir un horario')
]

let fileUpload = multer({ storage: multerDiskStorage });

/*** GET ALL events ***/
router.get('/', eventsController.index);

/*** CREATE ONE PRODUCT ***/
router.get('/create', adminCheck, eventsController.create);
router.post('/', adminCheck, fileUpload.single('event-image'), validateForm, eventsController.store);

/*** GET ONE PRODUCT ***/
router.get('/:id', eventsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/:id/edit', adminCheck, eventsController.edit);
router.put('/:id', adminCheck, fileUpload.single('event-image'), validateForm, eventsController.update);

/*** DELETE ONE PRODUCT***/
router.delete('/:id', adminCheck, eventsController.destroy);


module.exports = router;