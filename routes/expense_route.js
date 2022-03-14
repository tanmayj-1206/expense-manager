const express = require('express');
const router = express.Router();
const passport = require('passport');
const expenseController = require('../controllers/expense_controller')

router.get('/dashboard', passport.checkAuthentication, expenseController.getDashboard);
router.post('/create', passport.checkAuthentication, expenseController.create);
router.get('/delete/:id', passport.checkAuthentication, expenseController.delete);

module.exports = router;