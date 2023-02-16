const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];
const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //true;
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            result: usuario ? [usuario] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    return res.json({
        result: usuarios
    });
}

const buscarCategorias = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //true;
    if (esMongoID) {
        const categoira = await Categoria.findById(termino);
        return res.json({
            result: categoira ? [categoira] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const categoria = await Categoria.find({
        $or: [{ nombre: regex }],
        // $and: [{ estado: true }]
    });
    return res.json({
        result: categoria
    });
}
const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //true;
    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categorias', 'nombre');
        return res.json({
            result: producto ? [producto] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({nombre: regex, disponible: true
    }).populate('categoria', 'nombre');
    return res.json({
        result: productos
    });
}




const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `las coleecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'roles':
            res.json({
                msdg: 'BUscar',
                coleccion, termino
            })
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta bsuqueda ',
            })
            break;
    }


}

module.exports = {
    buscar
} 