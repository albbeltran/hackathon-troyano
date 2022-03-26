const User = require('../models/User');

function getPaginaAcceso(req, res) {
    res.render('acceso');
}

function getPaginaInicio(req, res) {
    res.render('inicio');
}

function getPaginaLogin(req, res) {
    res.render('login');
}

function getPaginaRegistrarse(req, res) {
    res.render('registro');
}

registro = async (req, res) => {
    let user = new User(req.body);
    try{
        await user.register();
        res.render('inicio');
    }
    catch(errors){
        res.send(errors);
    }
};

function login(req,res){
    let user = new User(req.body);
    async function userLogin(){
        try{
            await user.login()
            req.session.user = {username: user.data.usuario}
            req.session.save(() => res.redirect('/inicio'));
        } catch(errors){
            // req.flash('errors', error)
            console.log(errors)
            req.session.save(() => res.redirect('/'));
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


exports.getPaginaAcceso = getPaginaAcceso;
exports.getPaginaInicio = getPaginaInicio;
exports.getPaginaLogin = getPaginaLogin;
exports.getPaginaRegistrarse = getPaginaRegistrarse;
exports.login = login;
exports.registro = registro;