const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        //de tipo id de mongo
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },
    precio: {
        type: Number,
        default: 0,

    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    descripcion: {
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: { type: String }

});

ProductoSchema.methods.toJSON = function () {
    // para qutar esos argumentos de la base y resgresa los demas datos con el nombre de usuario 
    const { __v, estado, ...data } = this.toObject();
    return data;
}
module.exports = model('Producto', ProductoSchema);