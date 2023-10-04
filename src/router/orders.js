const asyncHelper = require('../helpers/async');
const ordersController = require('../controllers/orders');
const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const router = Router();

router.get(`/`, asyncHelper(ordersController.getAllOrders))

router.get(`/:id`, authenticate, asyncHelper(ordersController.getOneOrder))

router.post(`/`, authenticate, asyncHelper(ordersController.createOrder))

router.delete(`/:id`, authenticate, asyncHelper(ordersController.deleteOneOrder))

router.put(`/:id`, authenticate, asyncHelper(ordersController.updateOneOrder))

module.exports = router;
