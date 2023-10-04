const productsController = require('../controllers/products');
const { Router } = require('express');
const asyncHelper = require('../helpers/async');
const adminCheck = require('../middlewares/adminCheck');
const router = Router();

router.get(`/`, asyncHelper(productsController.getAllProducts))

router.get(`/:id`, asyncHelper(productsController.getOneProduct))

router.post(`/`, adminCheck, asyncHelper(productsController.createProduct))

router.delete(`/:id`, adminCheck, asyncHelper(productsController.deleteOneProduct))

router.put(`/:id`, adminCheck, asyncHelper(productsController.updateOneProduct))

module.exports = router;
