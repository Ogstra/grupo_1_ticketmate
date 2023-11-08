const express = require('express');
const router = express.Router();
const notLogged = require('../middlewares/notLogged');
const adminCheck = require('../middlewares/adminCheck');

const mainController = require('../controllers/mainController.js');

router.get('/', mainController.getIndex);

router.get('/carts', mainController.getCarts);

module.exports = router;