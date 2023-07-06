const { request, response } = require("express");


const esAdminRol = (req= request, res= response, next)=>{ 

    if(!req.usuario){ 
        return res.status(500).json({ 
            msg:'Se quiere verificar el rol sin validar el token y eso no se hace, tonto'
        })
    }

    const {rol, nombre} = req.usuario; 

    if(rol !=='ADMIN_ROL'){
        return res.status(401).json({
            msg:`Tú no eres administrador, anda a laar, no puedes borrar gente`
        })
    }
    



    next()
}

const tieneRol =(...roles)=>{ 




return (req,res=response, next) => {
    if(!req.usuario){ 
        return res.status(500).json({
            msg:'Se requiere validar el token primero, estúpido'
        })
    }

    if(!roles.includes(req.usuario.rol)){ 
        return res.status(401).json({
            msg: `El servicio requiere uno de estos roles ${roles}`
        })
    }


    next();
 }
    
}



module.exports = {
    esAdminRol,
    tieneRol
}