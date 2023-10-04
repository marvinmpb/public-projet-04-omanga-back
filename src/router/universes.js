const asyncHelper = require('../helpers/async');
const universesController = require('../controllers/universes');
const { Router } = require('express');
const adminCheck = require('../middlewares/adminCheck');
const router = Router();

router.get(`/`, asyncHelper(universesController.getAllUniverses))

router.get(`/:id`, asyncHelper(universesController.getOneUniverse))

router.post(`/`, adminCheck, asyncHelper(universesController.createUniverse))

router.put(`/:id`, adminCheck, asyncHelper(universesController.updateOneUniverse))

router.delete(`/:id`, adminCheck, asyncHelper(universesController.deleteOneUniverse))


module.exports = router;