const productsController = require('../controllers/products');
const { Router } = require('express');
const asyncHelper = require('../helpers/async');
const router = Router();

router.get(`/`, asyncHelper(productsController.getAllProducts))

router.get(`/:id`, asyncHelper(productsController.getOneProduct))

router.post(`/`, asyncHelper(productsController.createProduct))

router.delete(`/:id`, asyncHelper(productsController.deleteOneProduct))

router.put(`/:id`, asyncHelper(productsController.updateOneProduct))

module.exports = router;
