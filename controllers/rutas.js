const { response } = require('express')
const bcryptsjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req, res = response) => {
    
    const query = req.query; 
    const { limite = 5, desde = 0 } = req.query;
    const [total, usuarios] = await Promise.all([ 
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
         .skip(Number(desde))
         .limit(Number(limite)) 

    ])

    res.json({
        msg: 'Get APi - controlador',
        total,
        usuarios

    })
}

const usuariosPost = async (req, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    //encriptar la contraseña
    const salt = bcryptsjs.genSaltSync();
    usuario.password = bcryptsjs.hashSync(password, salt)

    //guardar en bd
    await usuario.save();
    res.json({
        msg: 'Post APi - controlador',
        usuario
    })
}



const usuariosPut = async (req, res = response) => {
    const { id } = req.params;             
    const { password, google, correo, _id, ...resto } = req.body; 
    
    if (password) {
        //encriptar la contraseña
        const salt = bcryptsjs.genSaltSync();
        resto.password = bcryptsjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true })


    res.json({
        msg: 'Put APi - controlador',
        usuario

    })
}



const usuariosDelete = async(req, res = response) => {
    const {id} =req.params
   

    //Borrar pero de a mentiritas
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    const usuarioAutenticado = req.usuario; 
    res.json({
        msg: 'Delete APi - controlador /Se ha borrado el siguiente usuario',
        usuario,
        usuarioAutenticado 
    })
}

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete }