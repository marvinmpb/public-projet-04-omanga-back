const universesController = require('../controllers/universes');
const { Router } = require('express');
const router = Router();

router.get(`/`, universesController.getAllUniverses)

router.get(`/:id`, universesController.getOneUniverse)

router.post(`/`, universesController.createUniverse)

router.put(`/:id`, universesController.updateOneUniverse)

router.delete(`/:id`, universesController.deleteOneUniverse)


module.exports = router;