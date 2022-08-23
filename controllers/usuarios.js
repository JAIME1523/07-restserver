
const { response, request } = require('express')
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
// const { validationResult } = require('express-validator');

const usuariosGet = (req = request, res = response) => {
    const { nombre, edad = 20 } = req.query;
    res.json({
        msg: 'get de la api controlador',
        nombre,
        edad
    });
};


const usuarioPut = (req, res = response) => {
    const id = req.params.id;
    const id2 = req.headers.id;

    console.log(req);
    res.json({
        msg: 'put de la api desde controlador',
        id,
        id2
    });
};

const usuarioPost = async (req, res = response) => {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json(errors);
    // }

    const { nombre, correo, password, rol } = req.body;
    const body = req.body;
    // const usuario = new Usuario(body);
    const usuario = new Usuario({ nombre, correo, password, rol });

    //verificar si el correo existe
    // const existeEmail = await Usuario.findOne({ correo });
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'El correo ya esta regsitrado',

    //     });

    // }
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en base de datos 
    await usuario.save();

    res.json({
        // msg: 'post de la api desde el controlador',
        usuario
        // nombre,
        // edad
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