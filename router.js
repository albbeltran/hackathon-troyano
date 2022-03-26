const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

router.get('/', userController.getPaginaAcceso);
router.get('/inicio', userController.getPaginaInicio);
router.get('/iniciar-sesion', userController.getPaginaLogin);
router.post('/login', userController.login);
router.get('/calendar', userController.getCalendar)
router.get('/registrarse', userController.getPaginaRegistrarse);
router.post('/registro', userController.registro);


module.exports = router