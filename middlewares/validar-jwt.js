const { response } = require("express")
const Usuario = require('../models/usuario');

const jwt = require('jsonwebtoken');
const usuario = require("../models/usuario");

const validarJWY = async (req, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer el usario que corresponde al id;
      const  usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido -uasrio no existe en db'
            });
        }

        //verificar si el uid tiene el estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado en flase'
            });
        }
        // req.uid = uid;
        req.usuario = usuario

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Token no valido'
        });
    }

}
module.exports = {
    validarJWY,
}