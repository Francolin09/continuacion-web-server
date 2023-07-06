const {Schema, model} = require('mongoose');

const RoleSchema= Schema({
    rol:{
        type:String,
        require: [true, 'El rol es oblgatorio'],
        
    }
})


module.exports = model('Role', RoleSchema)