const { Categoria } = require("../models");

const existeCategroia = async (id) => {
    const exiateCategoria = await Categoria.findById(id);
    if (!exiateCategoria) {
        throw new Error(` El ID ${id}, no existe`);
        // return res.status(400).json({
        //     msg: 'El correo ya esta regsitrado',

        // });

    }

}

module.exports = {
    existeCategroia
}