const Rol = require('../models/role');
const Usuario = require('../models/usuario');



const esRolevalido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(` El rol ${rol}, no esta registrado en la base de datos`);
    }

}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(` El correo ${correo},ya esta registrado en la base de datos`);
        // return res.status(400).json({
        //     msg: 'El correo ya esta regsitrado',

        // });

    }

}
const existeUsuarioPorId = async (id) => {
    const exiateUsuario = await Usuario.findById(id);
    if (!exiateUsuario) {
        throw new Error(` El ID ${id}, no existe`);
        // return res.status(400).json({
        //     msg: 'El correo ya esta regsitrado',

        // });

    }

}

module.exports = {
    esRolevalido,
    emailExiste,
    existeUsuarioPorId
}