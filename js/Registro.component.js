import { elementos, heroes } from './global.js';

window.guardarHeroe = (e) => {
    e.preventDefault();
    const tiempoActual = new Date();
    const inputsNode = e.target.querySelectorAll('input');
    const inputs = Array.from(inputsNode);
    let heroe = {}
    inputs.forEach((input) => {
        heroe[input.name] = input.value;
    });
    heroe.id = `${tiempoActual.getTime()}-${tiempoActual.getMilliseconds()}`;
    heroes.personajes.push(heroe);
    heroes.guardarStorage();
    elementos.alertaGuardar.style.display = '';
    setTimeout(() => {
        elementos.alertaGuardar.style.display = 'none';
        window.mostrarSeccion('todosLosHeroes');
    }, 1000);
}

export const initRegistro = () => {
    elementos.alertaGuardar.style.display = 'none';
}