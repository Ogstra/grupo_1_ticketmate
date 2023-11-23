// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check } = require('express-validator');
const notLogged = require('../../middlewares/notLogged');
const adminCheck = require('../../middlewares/adminCheck');


// ************ Controller Require ************
const apiEventsController = require('../../controllers/api/apiEventsController');

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
router.get('/', apiEventsController.getEvents);

router.get('/search/:search', apiEventsController.getEventByName);

router.get('/categories', apiEventsController.getCategories);

router.get('/venues', apiEventsController.getVenues);

/*** CREATE ONE PRODUCT ***/
//router.get('/create', adminCheck, apiEventsController.create);
//router.post('/', adminCheck, fileUpload.single('event-image'), validateForm, apiEventsController.store);

/*** GET ONE PRODUCT ***/
router.get('/:id', apiEventsController.getDetail);

/*** EDIT ONE PRODUCT ***/
//router.get('/:id/edit', adminCheck, apiEventsController.edit);
//router.put('/:id', adminCheck, fileUpload.single('event-image'), validateForm, apiEventsController.update);

/*** DELETE ONE PRODUCT***/
router.delete('/:id', apiEventsController.destroy);



module.exports = router;