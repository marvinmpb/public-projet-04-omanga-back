const asyncHelper = require('../helpers/async');
const universesController = require('../controllers/universes');
const { Router } = require('express');
const router = Router();

router.get(`/`, asyncHelper(universesController.getAllUniverses))

router.get(`/:id`, asyncHelper(universesController.getOneUniverse))

router.post(`/`, asyncHelper(universesController.createUniverse))

router.put(`/:id`, asyncHelper(universesController.updateOneUniverse))

router.delete(`/:id`, asyncHelper(universesController.deleteOneUniverse))


module.exports = router;