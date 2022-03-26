const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

router.get('/', userController.getPaginaAcceso);
// router.get('/', userController.getPaginaInicio);
router.get('/login', userController.login);
router.get('/registro', userController.registro);

module.exports = router