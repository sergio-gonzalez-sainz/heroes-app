import { elementos } from './global.js';
import { initTodosHeroes } from './TodosHeroes.component.js';
import { initBusquedaComponent } from './Busqueda.component.js';
import { initRegistro } from './Registro.component.js';

const init = () => {
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    elementos.fecha.innerText = `${dia}/${mes}/${anio}`;
    elementos.year.innerText = anio;
    initTodosHeroes();
    initBusquedaComponent();
    initRegistro();
    window.mostrarSeccion('todosLosHeroes');
}

window.mostrarSeccion = (section) => {
    elementos.sections.forEach((sectionElement) => {
        if (sectionElement.id === section) {
            sectionElement.style.display = '';
        } else {
            sectionElement.style.display = 'none';
        }

        if (sectionElement.id === 'todosLosHeroes') {
            initTodosHeroes();
        }
    });
}

init();