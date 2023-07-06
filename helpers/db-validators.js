const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => { 
    const existeRol = await Role.findOne({ rol: rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la bd`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail =await Usuario.findOne({ correo: correo });
    if (existeEmail) {
       throw new Error(`El correo ${correo} ya está registrado, tontito`)
    }
}  


const existeUsuarioPorId = async (id) => {             
    const existeUsuario = await Usuario.findById( id); 
    if (!existeUsuario) {
       throw new Error(`El id ${id} no existe en la base de datos, tontito`)
    }
}  


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}