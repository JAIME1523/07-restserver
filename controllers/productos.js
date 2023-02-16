const { response } = require("express");

const { Producto, Categoria } = require('../models/index');

//obtener categorias - Paginado -total- populate(ultimo usario);
const obtenerProductos = async (req, res = response) => {
    // const { nombre, edad = 20 } = req.query;
    const { limit = 5, desde = 0 } = req.query;
    const query = {
        estado: true
    }
    //coleccion de 2 promesas 
    const [total, producto] = await Promise.all([

        Producto.countDocuments(query),
        Producto.find(query).limit(Number(limit)).skip(Number(desde)).populate('usuario', 'nombre').populate('categoria', 'nombre')
    ]);
    console.log('total');

    res.json({
        total,
        producto
    });
}

//obtenerProducto -Polulate
const obtenerProducto = async (req, res = response) => {

    const uid = req.body.uid;
    const producto = await Producto.findOne({ uid }).populate('usuario', 'nombre').populate('categoria', 'nombre');
    if (producto != null) {
        res.status(201).json({
            producto
        });
    } else {
        return res.status(400).json({
            msg: ` producto no existe`
        });
    }

}


const crearProductos = async (req, res = response) => {
    const { nombre, precio, categoria, descripcion, disponible } = req.body
    const name = nombre.toUpperCase();
    const category = categoria.toUpperCase();

    const productoDB = await Producto.findOne({ nombre: name });
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya esta existe`
        });
    }
    const categoriaDB = await Categoria.findOne({ nombre: category });

    if (!categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${category}, NO  existe`
        });
    }

    //Gnerar la data para guardar
    const data = {
        nombre: name,
        precio, descripcion, disponible,
        usuario: req.usuario._id,
        categoria: categoriaDB._id

    }
    const producto = new Producto(data);
    await producto.save();
    res.status(201).json({
        producto
    });
}

//ActualizarProducto - caulquiera con token
const actualizarProducto = async (req, res = response) => {
    const { precio, categoria, descripcion, disponible } = req.body;
    const uid = req.body.uid;
    const nombre = req.body.nombre != null ? req.body.nombre.toUpperCase() : req.body.nombre;
    const categiriaDB = await Producto.findOne({ nombre });
    if (categiriaDB) {


        return res.status(400).json({
            msg: `El producto ${categiriaDB.nombre}, ya esta existe`
        });
    }

    await Producto.updateOne(req.body.uid, { nombre, usuario: req.usuario._id, precio, categoria, descripcion, disponible });
    const categoriaActulizada = await Producto.findOne({ uid }).populate('usuario', 'nombre').populate('categoria', 'nombre');;
    return res.status(201).json({
        categoriaActulizada
    });
}


//borrarCategoria - solo admin estado:false;


const borrarProducto = async (req, res = response) => {
    const uid = req.body.uid;



    const deleteProducto = await Producto.deleteOne(req.body.uid);

    return res.status(201).json({
        deleteProducto
    });
}

module.exports = {
    crearProductos,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
}