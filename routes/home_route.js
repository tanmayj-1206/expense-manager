const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');
const passport = require('passport');
const expenseController = require('../controllers/expense_controller')
const profileController = require('../controllers/profile_controller')

router.get('/',homeController.home);

router.post('/sign-up', usersController.signUp);
router.get('/verify-account/:token', usersController.confirmVerification);
router.post('/forgot-password', usersController.forgotPassword);
router.get('/reset-password/:token', usersController.resetPasswordView);

router.post('/change-password', usersController.resetPassword);

router.post('/login', usersController.login );

router.get('/logout', usersController.logout);



router.get('/dashboard', passport.checkAuthentication, expenseController.getDashboard);
router.post('/create', passport.checkAuthentication, expenseController.create);
router.get('/delete/:id', passport.checkAuthentication, expenseController.delete);

router.use('/expense', require('./expense_route'));

router.get('/profile', passport.checkAuthentication, profileController.getProfilePage);
router.post('/update-username', passport.checkAuthentication, profileController.updateUsername);
router.post('/update-password', passport.checkAuthentication, profileController.updatePassword);
router.post('/update-email', passport.checkAuthentication, profileController.updateEmail);
router.get('/verify-email/:token', profileController.verifyEmail);



module.exports = router;