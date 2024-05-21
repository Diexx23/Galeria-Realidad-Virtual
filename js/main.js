import { Modulo1 } from './modulo1.js';
import { Modulo2 } from './modulo2.js';
import { ModuloFBX } from './ModuloFBX.js';

let currentScene = null;

function cargarEscena(TipoEscena) {
    console.log('Cargando escena:', TipoEscena.name);

    // Eliminar el contenido del contenedor de la escena
    const container = document.getElementById('moduloContainer');
    container.innerHTML = '';

    // Crear una nueva instancia de la escena y agregarla al contenedor
    currentScene = new TipoEscena('moduloContainer');
    currentScene.animate();
}

document.addEventListener('DOMContentLoaded', function () {
    const modulo1Button = document.getElementById('modulo1Button');
    const modulo2Button = document.getElementById('modulo2Button');
    const moduloFBXButton = document.getElementById('moduloFBXButton');

    modulo1Button.addEventListener('click', function () {
        cargarEscena(Modulo1);
    });

    modulo2Button.addEventListener('click', function () {
        cargarEscena(Modulo2);
    });

    moduloFBXButton.addEventListener('click', function () {
        cargarEscena(ModuloFBX);
    });

    // Cargar Modulo1 por defecto al iniciar la página
    cargarEscena(Modulo1);
});

window.cargarEscena = cargarEscena; // Asegurarse de que cargarEscena sea accesible globalmente
