const {Router} = require('express'); 
const {check} = require('express-validator'); 
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJwt');
const { crearCategoria } = require('../controllers/categorias');


const router = Router();


router.get('/', (req, res)=> {
    res.json('Get de todo')
})



router.get('/:id', (req, res)=> { 
    res.json('get por id')
})

router.post('/',[ 
    validarJWT, 
    check('nombre','El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos 

], 
crearCategoria 
)

router.put('/:id', (req, res)=> {
    res.json('Puttt')
})

router.delete('/:id', (req, res)=> {
    res.json('pasamos el estado a false')
})
 








module.exports = router;