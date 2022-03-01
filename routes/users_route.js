const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.createNewUser);
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/users/sign-in' }), usersController.createSession)
router.get('/profile', passport.checkAuthentication, usersController.profile)
router.get('/sign-out', usersController.destroySession);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

module.exports = router;