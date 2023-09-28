const asyncHelper = require('../helpers/async');
const forgotPasswordController = require('../controllers/forgotPassword');
const { Router } = require('express');
const router = Router();

router.post(`/`, asyncHelper(forgotPasswordController.forgotPassword))

module.exports = router;
