const productsController = require('../controllers/products');
const { Router } = require('express');
const router = Router();

// RECUP TOUS LES PRODUITS
router.get(`/`, productsController.getAllProducts)

// RECUP UN PRODUIT
router.get(`/:id`, productsController.getOneProduct)

// CREER UN PRODUIT
router.post(`/`, productsController.createProduct)

// SUPPRIMER UN PRODUIT
router.delete(`/:id`, productsController.deleteOneProduct)

// MODIFIER UN PRODUIT
router.put(`/:id`, productsController.updateOneProduct)

module.exports = router;