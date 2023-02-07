const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
    const { correo, password } = req.body;
    // verificar si el imael existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        return res.status(400).json({
            msg: 'Usuario / password no son correstos- correo'
        })
    }
    //si el usuario esta activo 
    if (!usuario.estado) {
        return res.status(400).json({
            msg: 'Usuario / password no son correstos- estado: false'
        })
    }
    // Verficar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'Usuario / password no son correstos- pasword'
        })
    }
    //Generar el JWT
    const token = await generarJWT(usuario.id);

//repsuesta correcta
    try {
        res.json({
            msg: 'login OK',
            usuario,
            token,
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el servidor',
        })
    }
}

module.exports = {
    login,
}