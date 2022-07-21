const { Router } = require('express');
// const bodyParser = require("body-parser");
const {
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioPatch,
    usuarioDelete } = require('../controllers/usuarios');

    const bodyPserse = require("body-parser");


const router = Router();
const jsonParser = bodyPserse.json();

router.get('/', usuariosGet);
router.put('/', usuarioPut);
router.post('/',jsonParser,  usuarioPost);

router.patch('/', usuarioPatch);
router.delete('/',jsonParser, usuarioDelete);

module.exports = router;