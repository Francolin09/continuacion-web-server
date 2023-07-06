
const {Router} = require('express');// aca se desestructura Router que viene dentro del paquete de express
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/rutas');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos')
const Role = require('../models/rol');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validarJwt');
const { esAdminRol, tieneRol } = require('../middlewares/validarRoles');

const router = Router();



router.get('/', usuariosGet)



router.post('/',[ check('nombre','El nombre es obligatorio, maldita sea').not().isEmpty(),
                  check('password','El password debe tener más de 6 letras, maldita sea').isLength({min:6}),
                  check('correo','El correo no es válido, maldita sea').isEmail()],
                  check('correo').custom(emailExiste),
                  check('rol').custom(esRolValido),
                  validarCampos, usuariosPost
)

router.put('/:id',[ 
    check('id','No es un id Válido, tontito').isMongoId(), 
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
    
],usuariosPut) 

router.delete('/:id',[
    validarJWT,
    tieneRol('ADMIN_ROL','VENTAS_ROL'),
    check('id','No es un id Válido, tontito').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)







module.exports = router;