const universesController = require('../controllers/universes');
const { Router } = require('express');
const router = Router();

// RECUP TOUS LES UNIVERS
router.get(`/`, universesController.getAllUniverses)

// RECUP UN UNIVERS
router.get(`/:id`, universesController.getOneUniverse)

// CREER UN UNIVERS
router.post(`/`, universesController.createUniverse)

// MODIFIER UN UNIVERS
router.put(`/:id`, universesController.updateOneUniverse)

// SUPPRIMER UN UNIVERS
router.delete(`/:id`, universesController.deleteOneUniverse)


module.exports = router;