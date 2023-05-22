const url = 'http://localhost:8080/api/auth';
let usuario = null;
let socket = null;

//refrecinas html
const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');
//vlaidar el token del localstorage
const validarJWY = async () => {
    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch(url, {
        headers: {
            'x-token': token
        },
    });

    const { usuario: usarioDB, token: tokenDB } = await resp.json();

    localStorage.setItem('token', tokenDB);
    usuario = usarioDB;
    document.title = usuario.nombre;
    await conectarSocket();

}

const conectarSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token'),
        }
    });

    socket.on('connect', () => {
        console.log('Socket online');
    });

    socket.on('disconnect', (payload) => {

    });

    socket.on('recibir-mensaje',
        dibujarMensaje
    );

    socket.on('usuarios-activos',
        dibujarUsuario
    );

    socket.on('mensaje-privado', (payload) => {
        //por hacer
        console.log(payload)
    })
}

const main = async () => {
    await validarJWY();

};

const dibujarMensaje = (mensaje = []) => {
    let mensajesHtml = '';
    mensaje.forEach(({ nombre, mensaje, uid }) => {
        mensajesHtml += `<li>
    <p>
    <span class = "text-primary">${nombre}</span>
    <span class ="fs-6 text-muted"> ${mensaje}</span>
    </p>
    </li>`
    });

    ulMensajes.innerHTML = mensajesHtml;
}

const dibujarUsuario = (usuarios = []) => {
    let userHtml = '';
    usuarios.forEach(({ nombre, uid }) => {
        userHtml += `<li>
    <p>
    <h5 class = "text-success">${nombre}</h5>
    <span class ="fs-6 text-muted"> ${uid}</span>
    </p>
    </li>`
    });

    ulUsuarios.innerHTML = userHtml;
}
txtMensaje.addEventListener('keyup', ({ keyCode }) => {
    const mensaje = txtMensaje.value;
    const uid = txtUid.value;
    if (keyCode !== 13) { return; };
    if (mensaje.length === 0) { return; }
    socket.emit('enviar-mensaje', { mensaje, uid });
    txtMensaje.value = '';

});

main();

// const socket = io();