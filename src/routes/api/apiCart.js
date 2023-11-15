const express = require('express');
const router = express.Router();
const notLogged = require('../../middlewares/notLogged');
const adminCheck = require('../../middlewares/adminCheck');

const apiCartController = require('../../controllers/api/apiCartController.js');

router.get('/cart', adminCheck, apiCartController.getCart);

router.delete('/cart/:cartElementId', adminCheck, apiCartController.deleteOneCart);

//router.post('/cart/:id',apiCartController.addOneCart);

module.exports = router;