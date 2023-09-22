const favoriteUniversesController = require('../controllers/favoriteUniverses');
const { Router } = require('express');
const router = Router();

router.post('/:userId/favorite/universes/:universeId', favoriteUniversesController.addOneFavoriteUniverse);

router.get('/:userId/favorite/universes', favoriteUniversesController.getAllFavoriteUniverses);

router.delete('/:userId/favorite/universes/:universeId', favoriteUniversesController.removeOneFavoriteUniverse);

module.exports = router;
