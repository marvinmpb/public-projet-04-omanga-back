// const asyncHelper = require('../helpers/async');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
const categoriesController = require('../controllers/categories');
const { Router } = require('express');
const router = Router();




// RECUP TOUTES LES CATÉGORIES
router.get(`/`, categoriesController.getAllCategories)


// RECUP UNE CATÉGORIE
router.get(`/:id`, categoriesController.getOneCategory)

// CREER UNE CATÉGORIE
router.post(`/`, categoriesController.createCategory)

// SUPPRIMER UNE CATÉGORIE
router.delete(`/:id`, categoriesController.deleteOneCategory)

// MODIFIER UNE CATÉGORIE
router.put(`/:id`, categoriesController.updateOneCategory)

module.exports = router;