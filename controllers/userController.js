const User = require('../models/User');

let css_links = [];

function getPaginaAcceso(req, res) {
    css_links.push('<link rel="stylesheet" href="estilos/menu.css">');
    css_links.push('<link rel="stylesheet" href="estilos/acceso.css">');
    res.render('acceso', { css_links: css_links });
}

function getPaginaInicio(req, res) {
    css_links.push('<link rel="stylesheet" href="estilos/menu.css">');
    css_links.push('<link rel="stylesheet" href="estilos/inicio.css">');
    res.render('inicio', { css_links: css_links });
}

function login(req, res) {
    css_links.push('<link rel="stylesheet" href="estilos/menu.css">');
    css_links.push('<link rel="stylesheet" href="estilos/login-registro.css">');
    res.render('login', { css_links: css_links });
}

function registro(req, res) {
    css_links.push('<link rel="stylesheet" href="estilos/menu.css">');
    css_links.push('<link rel="stylesheet" href="estilos/login-registro.css">');
    res.render('registro', { css_links: css_links });
}


exports.getPaginaAcceso = getPaginaAcceso;
exports.getPaginaInicio = getPaginaInicio;
exports.login = login;
exports.registro = registro;