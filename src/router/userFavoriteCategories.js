const asyncHelper = require('../helpers/async');
const favoriteCategoriesController = require('../controllers/favoriteCategories');
const { Router } = require('express');
const router = Router();

router.post('/:userId/favorite/categories/:categoryId', asyncHelper(favoriteCategoriesController.addOneFavoriteCategory));

router.get('/:userId/favorite/categories', asyncHelper(favoriteCategoriesController.getAllFavoriteCategories));

router.delete('/:userId/favorite/categories/:categoryId', asyncHelper(favoriteCategoriesController.removeOneFavoriteCategory));


module.exports = router;
