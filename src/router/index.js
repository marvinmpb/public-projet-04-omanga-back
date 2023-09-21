const express = require('express');
const { PrismaClient } = require('@prisma/client');

const { Router } = require('express');
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const favoriteCategoriesController = require('../controllers/favoriteCategories');
const SECRET = process.env.JWT_SECRET;
const router = Router();

// const userController = require('../controllers/userController');

router.use(express.json())

// router.post('/signup', userController.signup);

// router.post('/login', userController.login);



router.use('/categories', require('./categories'));





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

