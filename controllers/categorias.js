const { response } = require("express");

const { Categoria } = require('../models/index');

//obtener categorias - Paginado -total- populate(ultimo usario);
const obtenerCategorias = async (req, res = response) => {
    // const { nombre, edad = 20 } = req.query;
    const { limit = 5, desde = 0 } = req.query;
    const query = {
        estado: true
    }
    //coleccion de 2 promesas 
    const [total, categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).limit(Number(limit)).skip(Number(desde)).populate('usuario', 'nombre')
    ]);
    res.json({
        total,
        categoria
    });
}

//obtenerCategoria -Polulate
const obtenerCategoria = async (req, res = response) => {
    const uid = req.body.uid;
    const categoria = await Categoria.findOne({ uid }).populate('usuario');
    if (categoria != null) {
        res.status(201).json({
            categoria
        });
    } else {
        return res.status(400).json({
            msg: `La categoria no existe`
        });
    }

}


const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categiriaDB = await Categoria.findOne({ nombre });
    if (categiriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categiriaDB.nombre}, ya esta existe`
        });
    }

    //Gnerar la data para guardar
    const data = {
        nombre,
        usuario: req.usuario._id

    }
    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json({
        categoria
    });
}

//ActualizarCategoria - caulquiera con token
const actualizarCategoria = async (req, res = response) => {
    const uid = req.body.uid;
    const nombre = req.body.nombre.toUpperCase();
    const categiriaDB = await Categoria.findOne({ nombre });
    if (categiriaDB) {


        return res.status(400).json({
            msg: `La categoria ${categiriaDB.nombre}, ya esta existe`
        });
    }

    const updateCategoria = await Categoria.updateOne(req.body.uid, { nombre: nombre, usuario: req.usuario._id });
    const newCategoria = await Categoria.findOne({ uid });
    console.log(updateCategoria);
    return res.status(201).json({
        newCategoria
    });
}


//borrarCategoria - solo admin estado:false;


const borrarCategoria = async (req, res = response) => {
    const uid = req.body.uid;



    const deleteCategoria = await Categoria.deleteOne(req.body.uid);
    console.log(deleteCategoria);
    return res.status(201).json({
         deleteCategoria
    });
}

module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria
}