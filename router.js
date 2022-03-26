const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const passport = require('passport');

router.get('/', userController.getPaginaAcceso);
router.get('/inicio', userController.getPaginaInicio);
router.get('/login', userController.login);
router.get('/registro', userController.registro);

router.get('/signup', (req, res, next) => {
    res.render('signup')
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));



module.exports = router