function getPaginaAcceso(req, res) {
    // res.render('acceso', { script: '<script src="js/acceso.js"></script>'});
    res.render('acceso');
}

// function getPaginaInicio(req, res) {
//     res.render('');
// }

function login(req, res) {
    res.render('login');
}

function registro(req, res) {
    res.render('registro');
}


exports.getPaginaAcceso = getPaginaAcceso;
exports.login = login;
exports.registro = registro;