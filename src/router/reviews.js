const reviewsController = require('../controllers/reviews');
const { Router } = require('express');
const router = Router();

router.post('/users/:userId/products/:productId', reviewsController.addReview);
router.get('/products/:productId', reviewsController.getAllReviewsByProduct);
router.get('/reviews/:reviewId', reviewsController.getOneReview);
router.put('/users/:userId/reviews/:reviewId', reviewsController.updateOneReview);
router.delete('/users/:userId/reviews/:reviewId', reviewsController.deleteOneReview);

module.exports = router;