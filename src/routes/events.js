// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const eventsController = require('../controllers/eventsController');

/*** GET ALL events ***/ 
router.get('/', eventsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', eventsController.create); 
router.post('/', eventsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', eventsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', eventsController.edit); 
router.put('/:id', eventsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', eventsController.destroy); 


module.exports = router;
