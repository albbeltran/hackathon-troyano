const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const mtriaController = require('./controllers/mtriaController')
const asesorController = require('./controllers/asesorController')

router.get('/', userController.getPaginaInicio);
router.get('/iniciar-sesion', userController.getPaginaLogin);
router.post('/login', userController.login);
router.get('/calendar', userController.getCalendar)
router.get('/registrarse', userController.getPaginaRegistrarse);
router.post('/registro', userController.registro);
router.get('/area-materia', userController.getPaginaArea);
router.post('/buscar-materia', userController.getPaginaArea);

router.post('/cargar-materias', mtriaController.cargarMaterias);

router.get('/registro-asesor', asesorController.getPaginaRegistro);
router.post('/registrar-asesor', asesorController.registro);


module.exports = router