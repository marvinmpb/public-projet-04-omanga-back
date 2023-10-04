const asyncHelper = require('../helpers/async');
const usersController = require('../controllers/users');
const authenticate = require('../middlewares/authenticate');
const { Router } = require('express');
const router = Router();

// INSCRIPTION
router.post(`/signup`, asyncHelper(usersController.createOne));

// CONNEXION
router.post(`/login`, asyncHelper(usersController.login))

// RECUP TOUS LES UTILISATEURS
// !!! CETTE ROUTE NE DOIT ËTRE ACCESSIBLE QUE PAR UN ADMIN
router.get(`/`, asyncHelper(usersController.getAllUsers))

// RECUP UN UTILISATEUR
router.get(`/:id`, authenticate, asyncHelper(usersController.getOneUser))

// MODIFIER UN UTILISATEUR
router.put(`/:id`, authenticate, asyncHelper(usersController.updateOneUser))

// SUPPRIMER UN UTILISATEUR
router.delete(`/:id`, authenticate, asyncHelper(usersController.deleteOneUser))

module.exports = router;
