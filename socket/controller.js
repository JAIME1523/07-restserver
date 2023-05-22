const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require("../models");

const chatMensajes = new ChatMensajes();
const socketController = async (socket = new Socket, io) => {
    const token = socket.handshake.headers['x-token'];
    const usuario = await comprobarJWT(token);
    if (!usuario) {
        return socket.disconnect;
    }

    //agregar el usuario conectado
    chatMensajes.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
    socket.emit('recibir-mensaje', chatMensajes.utlimos10);
    //CONECTARLO A UNA SALA ESPECIAL
    socket.join(usuario.id);

    socket.on('disconnect', () => {
        chatMensajes.desconectarUsaurio(usuario.id)
    });

    socket.on('enviar-mensaje', ({uid, mensaje}) => {
        if (uid) {
            socket.to(uid).emit('mensaje-privado', { de: usuario.nombre, mensaje });

        } else {
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensaje', chatMensajes.utlimos10)
        }
    });
    //limpiar cunado alguien se desconecte
}

module.exports = {
    socketController
}