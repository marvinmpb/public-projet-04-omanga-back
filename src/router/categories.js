const asyncHelper = require('../helpers/async');
const categoriesController = require('../controllers/categories');
const validation = require('../middlewares/validate');
const schema = require('../schemas/categories');
const { Router } = require('express');
const router = Router();

router.get(`/`, asyncHelper(categoriesController.getAllCategories))

router.get(`/:id`, asyncHelper(categoriesController.getOneCategory))

router.post(`/`, validation(schema.create, 'body'), asyncHelper(categoriesController.createCategory))

router.delete(`/:id`, asyncHelper(categoriesController.deleteOneCategory))

router.put(`/:id`, validation(schema.create, 'body'), asyncHelper(categoriesController.updateOneCategory))

module.exports = router;
