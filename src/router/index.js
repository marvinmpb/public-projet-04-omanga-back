const express = require('express');
const { Router } = require('express');
const router = Router();

router.use(express.json())

router.use('/categories', require('./categories'));
router.use('/universes', require('./universes'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));

module.exports = router;
