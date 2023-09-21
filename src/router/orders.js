
const ordersController = require('../controllers/orders');
const { Router } = require('express');
const router = Router();

// RECUP TOUTES LES ORDERS
router.get(`/`, ordersController.getAllOrders)

// RECUP UNE ORDER
router.get(`/:id`, ordersController.getOneOrder)

// CREER UNE ORDER
router.post(`/`, ordersController.createOrder)

// SUPPRIMER UNE ORDER
router.delete(`/:id`, ordersController.deleteOneOrder)

// MODIFIER UNE ORDER
router.put(`/:id`, ordersController.updateOneOrder)

module.exports = router;