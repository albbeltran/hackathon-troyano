const Materia = require('../models/Materia');

async function cargarMaterias(req, res) {
    let categoria = req.body.categoria;
    let materia = new Materia(categoria);
    try{
        let items = await materia.cargarMaterias();
        items = Object.values(items.items);
        res.render('inicio', {items: items})
    } catch(error){
        console.log(error);
    }
}

exports.cargarMaterias = cargarMaterias;