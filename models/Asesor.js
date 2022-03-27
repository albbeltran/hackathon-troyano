const coleccionTutores = require('../db').db().collection('tutores')

let Asesor = class {
    constructor(data){
        this.data = data
        this.errors = []
    }
}

Asesor.prototype.cleanUp = function() {
    //Cuando un usuario escriba un objeto, array, etc, vaciar el campo
    if(typeof(this.data.categoria) != 'string') this.data.categoria = ''
    if(typeof(this.data.nombreMateria) != 'string') this.data.nombreMapromedioMateria = ''
    if(typeof(this.data.promedioMateria) != 'string') this.data.promedioMateria = ''
    if(typeof(this.data.motivo) != 'string') this.data.motivo = ''

    //resetear cada campo para deshacerse de impurezas
    // this.data = {
    //     categoria: this.data.categoria.trim().toLowerCase(),
    //     nombreMateria: this.data.nombreMateria.trim().toLowerCase(),
    //     promedioMateria: this.data.promedioMateria.trim().toLowerCase(),
    //     motivo: this.data.motivo.trim().toLowerCase()
    // }
}

Asesor.prototype.validate = function() {
    return new Promise(async (resolve, reject) => {
        if(this.data.categoria == '') this.errors.push('Debes ingresar un área.')
        if(this.data.nombreMateria == '') this.errors.push('Debes ingresar una materia.')
        if(this.data.promedioMateria == '') this.errors.push('Debes ingresar un promedio.')
        if(this.data.motivo == '') this.errors.push('Debes ingresar un motivo.')

        resolve()
    })
}

Asesor.prototype.register = function() {
    return new Promise(async (resolve,reject) => {
        //Paso 1: Validar data del ususario
        this.cleanUp()
        await this.validate()
    
        /*Paso 2: Solo si no hay errores de validacion, guardar en la base de datos*/
        try{ 
            coleccionTutores.insertOne(this.data)
            resolve()
        } catch{
            reject(this.errors)
        }
    })
}

module.exports = Asesor