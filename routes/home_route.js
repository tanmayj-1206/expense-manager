const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.use('/users', require('./users_route'));
router.use('/expense', require('./expense_route'));
router.get('/',homeController.home);

module.exports = router;