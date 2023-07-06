const { response } = require("express");
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs'); 
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");
const login = async (req, res = response) => { 
    
    const {correo, password} = req.body; 
    
    try {

        
        const usuario = await Usuario.findOne({correo}); 
        if (!usuario){
            return res.status(400).json({
                msg:'Usuario o password incorrectos, tontito (fue el correo)'
            })
        }
       
        if(!usuario.estado){ 
            return res.status(400).json({
               msg:'Usuario o password no son correctos - se borro este usuario tonto'
            })
        }
        
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){ 
            return res.status(400).json({
                msg:'Usuario o password no son correctos - password incorrecto, tontito'
            })
        }
        
        const token = await generarJWT(usuario.id) 


        res.json({
            msg:'Login okeys',
            usuario,
            token  
        })
        
    } catch (error) {
        console.log(error) 
        return res.status(500).json({
            msg:'No sé na yo, hable con el admin que esto sae cayó'
        })
        
    }
   
}     


const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body; 
    
    try {
        const {correo, nombre, img} = await googleVerify(id_token);
        // console.log(correo,nombre,img)

        let usuario = await Usuario.findOne({correo});
        if(!usuario){
            const data = { 
                nombre,
                correo,
                password:'xd',
                img,
                google:true
            };

            usuario = new Usuario(data) 
            await usuario.save()
        };

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Usuario bloqueado, malandrin, sucio, delincuente o eliminado hehe'
            })
        }

        const token = await generarJWT(usuario.id); 

        

        res.json({ 
            msg:'Todo bien y bonito, aquí está su token mi rey',
            usuario,
            token,
            
        })

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'No se verifico el token, te vas a la chucha'
        })
        
    }
   
}

module.exports={
    login,
    googleSignIn 
}