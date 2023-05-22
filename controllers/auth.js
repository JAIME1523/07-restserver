const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
const googleSingIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            //tengo que crearlo 
            const data = {
                nombre,
                correo,
                img,
                rol: 'VENTAS_ROLE',
                password: ':p',
                img,
                google: true

            }
            usuario = new Usuario(data);
            await usuario.save();
        }
        // si el usuario en la DB esta bloquea 
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administardor, usuario bloqueado'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Todo fine',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se puede verificar'
        })

    }


}

const renovarToken = async (req, res = response) => {

    const { usuario } = req;
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    })

}

module.exports = {
    login,
    googleSingIn,
    renovarToken
}