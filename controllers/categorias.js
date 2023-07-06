const { response } = require("express");
const {Categoria} = require('../models/categoria')

const crearCategoria= async (req,res=response)=>{ 

    const nombre = req.body.nombre.toUpperCase();
    console.log(nombre)
    const categoriaDB = await Categoria.findOne({nombre});
    console.log(categoriaDB)
    if(categoriaDB){ 
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe `
        })
    }
    
    const data = {
        nombre,
        usuario: req.usuario._id  
    }
    console.log(data)
    const categoria = new Categoria(data); 
    await categoria.save()
    res.status(200).json(categoria)  
}






module.exports={
    crearCategoria
}