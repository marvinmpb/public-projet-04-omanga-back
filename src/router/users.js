const asyncHelper = require('../helpers/async');
const usersController = require('../controllers/users');
const authenticate = require('../middlewares/authenticate');
const adminCheck = require('../middlewares/adminCheck');
const validation = require('../middlewares/validate');
const schema = require('../schemas/users');
const { Router } = require('express');
const router = Router();

// INSCRIPTION
router.post(`/signup`, validation(schema.create, 'body'), asyncHelper(usersController.createOne));

// CONNEXION
router.post(`/login`, asyncHelper(usersController.login))

// RECUP TOUS LES UTILISATEURS
// !!! CETTE ROUTE NE DOIT ËTRE ACCESSIBLE QUE PAR UN ADMIN
router.get(`/`, adminCheck, asyncHelper(usersController.getAllUsers))

// RECUP UN UTILISATEUR
router.get(`/:userId`, authenticate, asyncHelper(usersController.getOneUser))

// MODIFIER UN UTILISATEUR
router.put(`/:userId`, authenticate, validation(schema.update, 'body'), asyncHelper(usersController.updateOneUser))

// SUPPRIMER UN UTILISATEUR
router.delete(`/:userId`, authenticate, asyncHelper(usersController.deleteOneUser))

module.exports = router;
