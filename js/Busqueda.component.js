import { elementos, heroes } from './global.js';


const itemSearch = (heroe) => {
    const li = ` 
    <li class="list-group-item">
    <img class="img-list" src="${heroe.imagen}"> ${heroe.alias} | ${heroe.nombre}
    </li>`;
    return li;
}

const itemBusquedaReciente = (term) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerText = term;
    li.addEventListener('click', seleccionarBusqueda);
    return li;
}

const limpiarBusquedas = () => {
    const busquedas = busquedasRecientesList.children;
    if (busquedas.length > 0) {
        const busquedasLi = Array.from(busquedas);
        busquedasLi.forEach((li) => {
            busquedasRecientesList.removeChild(li);
        });
    }
}

window.buscarHeroe = (e) => {

    const term = e.target.value.toLowerCase();

    if (!term) {
        return;
    }

    const heroesLista = resultadosBusqueda.children;
    if (heroesLista.length > 0) {
        const heroesChield = Array.from(heroesLista);
        heroesChield.forEach((item) => {
            resultadosBusqueda.removeChild(item);
        });
    }
    limpiarBusquedas();

    const resultado = heroes.personajes.filter((heroe) => {
        const nombre = heroe.nombre.toLowerCase();
        const alias = heroe.alias.toLowerCase();
        return nombre.includes(term) || alias.includes(term);
    });

    resultado.forEach((heroe) => {
        const li = itemSearch(heroe);
        resultadosBusqueda.insertAdjacentHTML('afterbegin', li);
    });

    if (!heroes.busquedas.includes(term)) {
        heroes.busquedas.push(term);
        heroes.guardarStorageBusqueda()
    }
    heroes.busquedas.forEach((termino) => {
        const li = itemBusquedaReciente(termino);
        elementos.busquedasRecientesList.append(li);
    });
}

window.seleccionarBusqueda = (e) => {
    const busqueda = e.target.innerText;
    inputBuscar.value = busqueda;
    const event = new Event('change');
    inputBuscar.dispatchEvent(event);
}


export const initBusquedaComponent = () => {
    heroes.busquedas.forEach((termino) => {
        const li = itemBusquedaReciente(termino);
        elementos.busquedasRecientesList.append(li);
    });
}