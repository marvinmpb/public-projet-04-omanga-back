const asyncHelper = require('../helpers/async');
const favoriteUniversesController = require('../controllers/favoriteUniverses');
const validation = require('../middlewares/validate');
const schema = require('../schemas/favoriteUniverses');
const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const router = Router();

router.post('/:id/favorite/universes/:universeId', authenticate, validation(schema.create, 'body'), asyncHelper(favoriteUniversesController.addOneFavoriteUniverse));

router.get('/:id/favorite/universes', authenticate, asyncHelper(favoriteUniversesController.getAllFavoriteUniverses));

router.delete('/:id/favorite/universes/:universeId', authenticate, asyncHelper(favoriteUniversesController.removeOneFavoriteUniverse));

module.exports = router;
