const coleccionMateria = require('../db').db().collection('materias');

let Materia = class {
    constructor(categoria){
        this.categoria = categoria;
    }
 
    cargarMaterias() {
        return new Promise((resolve, reject) => {
            coleccionMateria.find({categoria: this.categoria}).toArray((err,items)=>{
                resolve({items: items});
            })
        })
    }
}

module.exports = Materia;