const productsController = require('../controllers/products');
const { Router } = require('express');
const router = Router();

router.get(`/`, productsController.getAllProducts)

router.get(`/:id`, productsController.getOneProduct)

router.post(`/`, productsController.createProduct)

router.delete(`/:id`, productsController.deleteOneProduct)

router.put(`/:id`, productsController.updateOneProduct)

module.exports = router;