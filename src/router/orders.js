const asyncHelper = require('../helpers/async');
const ordersController = require('../controllers/orders');
const validation = require('../middlewares/validate');
const schema = require('../schemas/orders');
const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const router = Router();

router.get(`/`, asyncHelper(ordersController.getAllOrders))

router.get(`/:id`, authenticate, asyncHelper(ordersController.getOneOrder))

router.post(`/`, authenticate, validation(schema.create, 'body'), asyncHelper(ordersController.createOrder))

router.delete(`/:id`, authenticate, asyncHelper(ordersController.deleteOneOrder))

router.put(`/:id`, authenticate, validation(schema.create, 'body'), asyncHelper(ordersController.updateOneOrder))

module.exports = router;
