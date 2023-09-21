const usersController = require('../controllers/users');
const { Router } = require('express');
const router = Router();

// INSCRIPTION
router.post(`/signup`, usersController.createOne)

// CONNEXION
router.post(`/login`, usersController.login)

// RECUP TOUS LES UTILISATEURS
// !!! CETTE ROUTE NE DOIT ËTRE ACCESSIBLE QUE PAR UN ADMIN
router.get(`/`, usersController.getAllUsers)

// RECUP UN UTILISATEUR
router.get(`/:id`, usersController.getOneUser)

// MODIFIER UN UTILISATEUR
router.put(`/:id`, usersController.updateOneUser)

// SUPPRIMER UN UTILISATEUR
router.delete(`/:id`, usersController.deleteOneUser)

module.exports = router;
