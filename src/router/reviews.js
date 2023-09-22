const asyncHelper = require('../helpers/async');
const reviewsController = require('../controllers/reviews');
const { Router } = require('express');
const router = Router();

router.post('/users/:userId/products/:productId', asyncHelper(reviewsController.addReview));

router.get('/products/:productId', asyncHelper(reviewsController.getAllReviewsByProduct));

router.get('/reviews/:reviewId', asyncHelper(reviewsController.getOneReview));

router.put('/users/:userId/reviews/:reviewId', asyncHelper(reviewsController.updateOneReview));

router.delete('/users/:userId/reviews/:reviewId', asyncHelper(reviewsController.deleteOneReview));

module.exports = router;
