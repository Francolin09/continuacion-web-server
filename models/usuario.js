
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio maldita sea']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio maldita sea'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria maldita sea'],
        
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required: true,
        emun:['ADMIN_ROL','USER_ROL'], //ESTO LE DICE QUE PUEDE SER UNO O EL OTRO
        default:'USER_ROLE'
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject(); 
    usuario.uid = _id; 
    return usuario;
}





module.exports = model('Usuario', UsuarioSchema)
