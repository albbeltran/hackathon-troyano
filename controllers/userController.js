const User = require('../models/User');

function getPaginaInicio(req, res) {
    if(req.session.user){
        res.render('inicio', {usuario: req.session.user.usuario})
    } else{
        res.render('acceso', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
    }
}

function getPaginaLogin(req, res) {
    res.render('login',  {errors: req.flash('errors'), regErrors: req.flash('regErrors')});
}

function getPaginaRegistrarse(req, res) {
    res.render('registro', {errors: req.flash('errors'), regErrors: req.flash('regErrors')});
}

function getPaginaArea(req, res) { 
    if(req.session.user){
        res.render('form-materias', { usuario: req.session.user.usuario });
    } else{
        res.redirect('/')
    }
}

registro = async (req, res) => {
    let user = new User(req.body);
    try{
        await user.register();
        res.redirect('/area-materia');
    }
    catch(errors){
        req.flash('errors', errors)
        req.session.save(() => res.redirect('/registrarse'));
    }
};

function login(req,res){
    let user = new User(req.body);
    async function userLogin(){
        try{
            await user.login()
            req.session.user = {usuario: user.data.usuario}
            req.session.save(() => res.redirect('/area-materia'));
        } catch(errors){
            req.flash('errors', errors)
            req.session.save(() => res.redirect('/iniciar-sesion'));
        }
    }
    userLogin()
}

function logout(req,res){
    async function logOut() {
        await req.session.destroy();
        res.redirect('/');
    }
    logOut();
}

function buscarMateria(req, res) {

}

exports.getPaginaInicio = getPaginaInicio;
exports.getPaginaLogin = getPaginaLogin;
exports.getPaginaRegistrarse = getPaginaRegistrarse;
exports.getPaginaArea = getPaginaArea;
exports.login = login;
exports.registro = registro;
exports.buscarMateria = buscarMateria;