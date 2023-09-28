const asyncHelper = require('../helpers/async');
const resetPasswordController = require('../controllers/resetPassword');
const { Router } = require('express');
const router = Router();

router.patch(`/:token`, asyncHelper(resetPasswordController.resetPassword))

module.exports = router;
