const Asesor = require('../models/Asesor');

function getPaginaRegistro(req, res) {
    res.render('registro-asesor', {errors: req.flash('errors'), regErrors: req.flash('regErrors')});
}

registro = async (req, res) => {
    let asesor = new Asesor(req.body);
    try{
        await asesor.register();
        res.redirect('/');
    }
    catch(errors){
        req.flash('errors', errors)
        req.session.save(() => res.redirect('/registro-asesor'));
    }
};

exports.getPaginaRegistro = getPaginaRegistro;
exports.registro = registro;
