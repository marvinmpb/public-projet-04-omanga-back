const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express();
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const favoriteCategoriesController = require('../controllers/favoriteCategories');
const SECRET = process.env.JWT_SECRET;

// const userController = require('../controllers/userController');

router.use(express.json())

// router.post('/signup', userController.signup);

// router.post('/login', userController.login);

// INSCRIPTION
router.post(`/signup`, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const cryptedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: cryptedPassword,
      }
    })

    // Gérener un token
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '24h' });
    // Envoyer le token au client
    return res.json({ token });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la tentative d'inscription" });
  }
})

// CONNEXION
router.post(`/login`, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    })

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!user || !valid) {
      res.status(401).json({ message: 'La combinaison email/mot de passe est incorrecte' });
      return;
    }

    // Gérener un token
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '24h' });
    // Envoyer le token au client
    res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la tentative de connexion" });
  }
}
)

// RECUP TOUS LES UTILISATEURS
router.get(`/user`, async (req, res) => {
  try {
    const result = await prisma.user.findMany()
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération des utilisateurs" });
  }
})

// RECUP UN UTILISATEUR
router.get(`/user/:id`, async (req, res) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération de l'utilisateur" });
  }
})

// AJOUT D'UNE CATEGORIE FAVORITE POUR UN UTILISATEUR
router.post('/user/:userId/favorite/categories/:categoryId', favoriteCategoriesController.addOneFavoriteCategory);



// RECUP LES CATEGORIES FAVORITES D'UN UTILISATEUR
router.get('/user/:userId/favorite/categories', favoriteCategoriesController.getAllFavoriteCategories);

// RETIRER UNE CATÉGORIE FAVORITE D'UN UTILISATEUR
router.delete('/user/:userId/favorite/categories/:categoryId', favoriteCategoriesController.removeOneFavoriteCategory);

// RECUP TOUTES LES CATÉGORIES
router.get(`/category`, async (req, res) => {
  try {
    const result = await prisma.category.findMany()
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération des catégories" });
  }
})

// RECUP UNE CATÉGORIE
router.get(`/category/:id`, async (req, res) => {
  try {
    const result = await prisma.category.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération de la catégorie" });
  }
})

// CREER UNE CATÉGORIE
router.post(`/category`, async (req, res) => {
  try {
    const result = await prisma.category.create({
      data: req.body
    })
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la création de la catégorie" });
  }
})


// RECUP TOUS LES UNIVERS
router.get(`/universe`, async (req, res) => {
  try {
    const result = await prisma.universe.findMany()
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération des univers" });
  }
})

// RECUP UN UNIVERS
router.get(`/universe/:id`, async (req, res) => {
  try {
    const result = await prisma.universe.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération de l'univers" });
  }
})

// CREER UN UNIVERS
router.post(`/universe`, async (req, res) => {
  try {
    const result = await prisma.universe.create({
      data: req.body
    })
    res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la création de l'univers" });
  }
})

// router.post(`/product`, async (req, res) => {
//   const result = await prisma.product.create({
//     data: req.body
//   })
//   res.json(result)
// })


// router.post(`/review`, async (req, res) => {
//   const result = await prisma.review.create({
//     data: req.body
//   })
//   res.json(result)
// })

module.exports = router;

