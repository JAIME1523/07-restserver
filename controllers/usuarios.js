
const { response, request } = require('express')

const usuariosGet = (req = request , res = response) => {
    const {nombre, edad = 'sin edad'}  = req.query;
    res.json({
        msg: 'get de la api controlador',
        nombre,
        edad
    });
};


const usuarioPut = (req, res = response) => {
    const id =  req.params.id;
    const id2 =  req.headers.id;

console.log(req);
    res.json({
        msg: 'put de la api desde controlador',
        id,
        id2
    });
};

const usuarioPost = (req, res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post de la api desde el controlador',
        nombre,
        edad
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