
const ordersController = require('../controllers/orders');
const { Router } = require('express');
const router = Router();

router.get(`/`, ordersController.getAllOrders)

router.get(`/:id`, ordersController.getOneOrder)

router.post(`/`, ordersController.createOrder)

router.delete(`/:id`, ordersController.deleteOneOrder)

router.put(`/:id`, ordersController.updateOneOrder)

module.exports = router;