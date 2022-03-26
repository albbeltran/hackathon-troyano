const bcrypt = require('bcryptjs')
const coleccionUsuarios = require('../db').db().collection('usuarios')
const validator = require('validator')

let User = class {
    constructor(data){
        this.data = data
        this.errors = []
    }
}

User.prototype.cleanUp = function() {
    //Cuando un usuario escriba un objeto, array, etc, vaciar el campo
    if(typeof(this.data.expediente) != 'string') this.data.expediente = ''
    if(typeof(this.data.nombre) != 'string') this.data.nombre = ''
    if(typeof(this.data.email) != 'string') this.data.email = ''
    if(typeof(this.data.usuario) != 'string') this.data.usuario = ''
    if(typeof(this.data.password) != 'string') this.data.password = ''

    //resetear cada campo para deshacerse de impurezas
    this.data = {
        expediente: this.data.expediente.trim().toLowerCase(),
        nombre: this.data.nombre.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        usuario: this.data.usuario.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.validate = function() {
    return new Promise(async (resolve, reject) => {
        if(this.data.usuario == '') this.errors.push('Debes ingresar un usuario')
        if(this.data.usuario != '' && !validator.isAlphanumeric(this.data.usuario)) this.errors.push('El usuario solo puede contener numeros y letras.')
        if(!validator.isEmail(this.data.email)) this.errors.push('Debes de proveer un correo electrónico válido.')
        if(this.data.password == '') this.errors.push('Debes ingresar una contraseña.')
        if(this.data.password.length > 0 && this.data.password.length < 12) this.errors.push('La contraseña debe tener al menos 12 caracteres.')
        if(this.data.password.length > 50) this.errors.push('La contraseña no puede exceder 50 caracteres.')
        if(this.data.usuario.length > 0 && this.data.usuario.length < 3) this.errors.push('El usuario debe tener al menos 3 caracteres.')
        if(this.data.usuario.length > 15) this.errors.push('El usuario no puede exceder 15 caracteres.')
    
        if(this.data.usuario.length > 2 && this.data.usuario.length <31 && validator.isAlphanumeric(this.data.usuario)) {
            let usuarioExiste = await coleccionUsuarios.findOne({usuario: this.data.usuario})
            //Si el usuario ya existe
            if(usuarioExiste) this.errors.push('El usuario ya ha sido escogido.')
        }
    
        if(validator.isEmail(this.data.email)) {
            let emailExiste = await coleccionUsuarios.findOne({email: this.data.email})
            //Si el usuario ya esta tomado
            if(emailExiste) this.errors.push('El correo ya esta en uso.')
        }
        resolve()
    })
}

User.prototype.login = function() {
    return new Promise((resolve,reject) => {
        // Checar si hay valores de string en la data
        this.cleanUp()
        coleccionUsuarios.findOne({usuario: this.data.usuario}).then(usuarioEncontrado => {
            if(usuarioEncontrado && bcrypt.compareSync(this.data.password, usuarioEncontrado.password)){
                this.data = usuarioEncontrado
                resolve('Felicidades!')
            }else{
                reject('Usuario y/o contraseña inválidos.')
            }
        }).catch(() => {
            reject('Por favor inténtalo más tarde.')
        })
    })
}

User.prototype.register = function() {
    return new Promise(async (resolve,reject) => {
        //Paso 1: Validar data del ususario
        this.cleanUp()
        await this.validate()
    
        /*Paso 2: Solo si no hay errores de validacion, guardar en la base de datos*/
    
        if(!this.errors.length){
            //Hashear la contraseña
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            //Insertar el objeto actual a la base de datos
            coleccionUsuarios.insertOne(this.data)
            resolve()
        } else{
            reject(this.errors)
        }
    })
}

module.exports = User