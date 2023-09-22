const asyncHelper = require('../helpers/async');
const ordersController = require('../controllers/orders');
const { Router } = require('express');
const router = Router();

router.get(`/`, asyncHelper(ordersController.getAllOrders))

router.get(`/:id`, asyncHelper(ordersController.getOneOrder))

router.post(`/`, asyncHelper(ordersController.createOrder))

router.delete(`/:id`, asyncHelper(ordersController.deleteOneOrder))

router.put(`/:id`, asyncHelper(ordersController.updateOneOrder))

module.exports = router;
