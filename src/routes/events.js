// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const eventsController = require('../controllers/eventsController');

// ************ Configuracion de Multer ************
let multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/images/products');
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
});

let fileUpload = multer({ storage: multerDiskStorage });

/*** GET ALL events ***/
router.get('/', eventsController.index);

/*** CREATE ONE PRODUCT ***/
router.get('/create', eventsController.create);
router.post('/', fileUpload.single('event-image'), eventsController.store);


/*** GET ONE PRODUCT ***/
router.get('/:id', eventsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/:id/edit', eventsController.edit);
router.put('/:id', fileUpload.single('event-image'), eventsController.update);


/*** DELETE ONE PRODUCT***/
router.delete('/:id', eventsController.destroy);


module.exports = router;
