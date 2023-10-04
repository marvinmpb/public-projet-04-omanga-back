const asyncHelper = require('../helpers/async');
const reviewsController = require('../controllers/reviews');
const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const router = Router();

router.post('/users/:id/products/:productId', authenticate, asyncHelper(reviewsController.addReview));

router.get('/products/:productId', asyncHelper(reviewsController.getAllReviewsByProduct));

router.get('/reviews/:reviewId', asyncHelper(reviewsController.getOneReview));

router.put('/users/:id/reviews/:reviewId', authenticate, asyncHelper(reviewsController.updateOneReview));

router.delete('/users/:id/reviews/:reviewId', authenticate, asyncHelper(reviewsController.deleteOneReview));

module.exports = router;
