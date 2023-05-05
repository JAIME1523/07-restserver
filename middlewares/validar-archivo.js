const { response } = require("express")

const validarArchivoSubir = (req, res = response, netx) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No hay archivos que subir - validar archivo subir ' });
    }
    netx();
}

module.exports = {
    validarArchivoSubir
}