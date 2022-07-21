const { Router } = require('express');
const { usuariosGet, usuarioPut, usuarioPost, usuarioPatch, usuarioDelete } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet);
router.put('/', usuarioPut);
router.post('/', usuarioPost);

router.patch('/', usuarioPatch);
router.delete('/', usuarioDelete);

module.exports = router;