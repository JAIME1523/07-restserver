const path = require("path");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require('../models/index')
const fs = require('fs');

const cargarArchivo = async (req, res = response) => {
    try {
        //Imagenes
        // const nombre = await subirArchivo(req.files, ['txt'],'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombre
        })
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

}

const actualizarImagen = async (req, res = response) => {
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(404).json({
                    msg: `No extiste un usario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(404).json({
                    msg: `No extiste un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'semeolvido validar esto' })
    }
    //limpiar imagenes previas 
    if (modelo.img) {
        //hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();
    res.json({
        modelo
    })

}

const mostrarImagen = async (req, res = response) => {
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No extiste un usario con el id ${id}`
                })
            }
            break;
        case 'productos':

            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No extiste un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' })
    }
    //limpiar imagenes previas 
    if (modelo.img) {
        //hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {

            return res.sendFile(pathImagen);
        }
    }

    const pathImagen = path.join(__dirname, '../assets', 'no-image.jpg');

    return res.sendFile(pathImagen);

}



const actualizarImagenCloudinary = async (req, res = response) => {
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(404).json({
                    msg: `No extiste un usario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(404).json({
                    msg: `No extiste un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'semeolvido validar esto' })
    }
    //limpiar imagenes previas 
    if (modelo.img) {
        //hay que borrar la imagen del servidor
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');

        cloudinary.uploader.destroy(public_id);

    }
    const { tempFilePath } = req.files.archivo;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    modelo.img = secure_url;
    await modelo.save();

    res.json(
        modelo
    )

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}