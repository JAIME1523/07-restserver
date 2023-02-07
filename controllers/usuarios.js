
const { response, request } = require('express')
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
// const { validationResult } = require('express-validator');

const usuariosGet = async (req = request, res = response) => {
    // const { nombre, edad = 20 } = req.query;
    const { limit = 5, desde = 0 } = req.query;
    const query = {
        estado: true
    }
    //poner validacion que siempre recibe un numero
    // const usuarios = await Usuario.find(query).limit(Number(limit)).skip(Number(desde));
    // const total =  await Usuario.countDocuments(query)


    //coleccion de 2 promesas 
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).limit(Number(limit)).skip(Number(desde))
    ]);
    res.json({
        total,
        usuarios
    });
};


const usuarioPut = async (req, res = response) => {
    // const id = req.params.id;
    // const id2 = req.headers.id;
    const { id } = req.params;
    //TODO: validar con la base de datos
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    // console.log(req);
    res.json({
        msg: 'put de la api desde controlador',

        usuario
        // id2
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


const usuarioDelete = async (req, res = response) => {
    const body = req.body;
    const { id } = req.params;
    // const uid = req.uid
    //Fisiscamente los borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    //borrrar sin eliminar 
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    const usuarioAutenticado = req.usuario;


    res.json({
        // msg: 'delete de la api desde el controllador',
        usuario,
       usuarioAutenticado
    });
};

module.exports = {
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioPatch,
    usuarioDelete,
}