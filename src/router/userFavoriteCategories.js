// AJOUT D'UNE CATEGORIE FAVORITE POUR UN UTILISATEUR
router.post('/user/:userId/favorite/categories/:categoryId', favoriteCategoriesController.addOneFavoriteCategory);

// RECUP LES CATEGORIES FAVORITES D'UN UTILISATEUR
router.get('/user/:userId/favorite/categories', favoriteCategoriesController.getAllFavoriteCategories);

// RETIRER UNE CATÉGORIE FAVORITE D'UN UTILISATEUR
router.delete('/user/:userId/favorite/categories/:categoryId', favoriteCategoriesController.removeOneFavoriteCategory);


module.exports = router;