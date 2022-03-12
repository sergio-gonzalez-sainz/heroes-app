import Heroes from './Heroes.js';

const sectionsNode = document.querySelectorAll('section');

export const elementos = {
    sections: Array.from(sectionsNode),
    alertaGuardar: document.getElementById('alertaGuardar'),
    cardsHeores: document.getElementById('cardsHeores'),
    resultadosBusqueda: document.getElementById('resultadosBusqueda'),
    busquedasRecientesList: document.getElementById('busquedasRecientesList'),
    inputBuscar: document.getElementById('inputBuscar'),
    fecha: document.getElementById('fecha'),
    year: document.getElementById('year'),
}
export let busquedasRecientes = [];
export const heroes = new Heroes();