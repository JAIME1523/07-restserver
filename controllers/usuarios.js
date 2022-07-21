
const { response } = require('express')

const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'get de la api controlador'
    });
};


const usuarioPut = (req, res = response) => {
    res.json({
        msg: 'put de la api desde controlador'
    });
};

const usuarioPost = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: 'post de la api desde el controlador',
        body
    });
};
const usuarioPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Patch de la api desde el controllador'
    });
};


const usuarioDelete = (req, res = response) => {
    const body = req.body;
    res.json({
        msg: 'delete de la api desde el controllador',
        body
    });
};

module.exports = {
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioPatch,
    usuarioDelete,
}