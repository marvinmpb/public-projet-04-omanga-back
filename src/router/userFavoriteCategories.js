const favoriteCategoriesController = require('../controllers/favoriteCategories');
const { Router } = require('express');
const router = Router();

router.post('/:userId/favorite/categories/:categoryId', favoriteCategoriesController.addOneFavoriteCategory);

router.get('/:userId/favorite/categories', favoriteCategoriesController.getAllFavoriteCategories);

router.delete('/:userId/favorite/categories/:categoryId', favoriteCategoriesController.removeOneFavoriteCategory);


module.exports = router;
