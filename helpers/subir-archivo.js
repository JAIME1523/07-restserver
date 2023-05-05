const path = require("path");
const { v4: uuidv4 } = require('uuid');


const subirArchivo = (files, extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');
        const extencion = nombreCortado[nombreCortado.length - 1];

        //Validar la extension 


        if (!extencionesValidas.includes(extencion)) {
            return reject(`la estensión ${extencion}, no es permitida- ${extencionesValidas}`)
        }

        const nombreTemp = uuidv4() + '.' + extencion;
        path.dirname
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp)

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }
            resolve(nombreTemp);


        })

    })
}

module.exports = {
    subirArchivo
}