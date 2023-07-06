const {Router} = require('express'); 
const {check} = require('express-validator');
const { usuariosGet } = require('../controllers/rutas');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio, tontito').isEmail(), 
    check('password', 'La contraseña es obligatoria, tontito').not().isEmpty(),
    validarCampos
] ,login ) 


router.post('/google',[
    check('id_token','El id de google es obligatorio, tontito').not().isEmpty(), 
    
    validarCampos
] ,googleSignIn ) 

module.exports = router;