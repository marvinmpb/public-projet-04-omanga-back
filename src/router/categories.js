// const asyncHelper = require('../helpers/async');
const categoriesController = require('../controllers/categories');
const { Router } = require('express');
const router = Router();

router.get(`/`, categoriesController.getAllCategories)

router.get(`/:id`, categoriesController.getOneCategory)

router.post(`/`, categoriesController.createCategory)

router.delete(`/:id`, categoriesController.deleteOneCategory)

router.put(`/:id`, categoriesController.updateOneCategory)

module.exports = router;
