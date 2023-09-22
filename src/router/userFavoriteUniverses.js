const asyncHelper = require('../helpers/async');
const favoriteUniversesController = require('../controllers/favoriteUniverses');
const { Router } = require('express');
const router = Router();

router.post('/:userId/favorite/universes/:universeId', asyncHelper(favoriteUniversesController.addOneFavoriteUniverse));

router.get('/:userId/favorite/universes', asyncHelper(favoriteUniversesController.getAllFavoriteUniverses));

router.delete('/:userId/favorite/universes/:universeId', asyncHelper(favoriteUniversesController.removeOneFavoriteUniverse));

module.exports = router;
