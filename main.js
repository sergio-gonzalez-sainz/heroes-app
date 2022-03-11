const sectionsNode = document.querySelectorAll('section');
const sections = Array.from(sectionsNode);
const alertaGuardar = document.getElementById('alertaGuardar');
const cardsHeores = document.getElementById('cardsHeores');
const resultadosBusqueda = document.getElementById('resultadosBusqueda');
const busquedasRecientesList = document.getElementById('busquedasRecientesList');
const inputBuscar = document.getElementById('inputBuscar');
const fecha = document.getElementById('fecha');
const year = document.getElementById('year');
let heroes = [];
let busquedasRecientes = [];

const init = () => {

    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();

    fecha.innerText = `${dia}/${mes}/${anio}`;

    year.innerText = anio;




    const heroesLocales = localStorage.getItem('heroes');
    if (heroesLocales) {
        heroes = JSON.parse(heroesLocales);
        renderizarHeroes();
    }

    const busquedasLocales = localStorage.getItem('busquedas');
    if (busquedasLocales) {
        busquedasRecientes = JSON.parse(busquedasLocales);
        busquedasRecientes.forEach((termino) => {
            const li = itemBusquedaReciente(termino);
            busquedasRecientesList.append(li);
        });
    }
    sections.forEach((section) => {
        if (section.id != 'todosLosHeroes') {
            section.style.display = 'none';
        }

        alertaGuardar.style.display = 'none';
        // if (section.id != 'buscar') {
        //     section.style.display = 'none';
        // }


    });
}

const mostrarTodosHerores = () => {
    sections.forEach((section) => {
        if (section.id === 'todosLosHeroes') {
            section.style.display = '';
        } else {
            section.style.display = 'none';
        }
    });
}

const mostrarRegistrar = () => {
    sections.forEach((section) => {
        if (section.id === 'registro') {
            section.style.display = '';
        } else {
            section.style.display = 'none';
        }
    });
}

const mostrarBuscar = () => {
    sections.forEach((section) => {
        if (section.id === 'buscar') {
            section.style.display = '';
        } else {
            section.style.display = 'none';
        }
    });
}

const cardHeroe = (heroe) => {
    const card = `<div class="card col-sm-4">
        <img src="${heroe.imagen}" class="img-card-custom" >
        <div class="card-body">
            <h5 class="card-title">${heroe.alias}</h5>
            <p class="card-text">Nombre Real: ${heroe.nombre}</p>
            <div class = "d-flex justify-content-end gap-3">
                <button class="btn btn-primary"><i class="fa-solid fa-paintbrush"></i></button>
                <button onclick="eliminarHeroe(${heroe.id})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>

    </div>`;
    return card;
}

const eliminarHeroe = (id) => {

    const eliminar = confirm('¿Deseas eliminar este héroe?')
    if (eliminar == true) {
        heroes = heroes.filter((heroe) => {
            return heroe.id != id;
        });
        const heroesJson = JSON.stringify(heroes);
        localStorage.setItem('heroes', heroesJson);
        renderizarHeroes();
    }

}

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

const seleccionarBusqueda = (e) => {
    const busqueda = e.target.innerText;
    inputBuscar.value = busqueda;
    const event = new Event('change');
    inputBuscar.dispatchEvent(event);
}

const renderizarHeroes = () => {

    const cardsEnDiv = cardsHeores.children;
    if (cardsEnDiv.length > 0) {
        const cards = Array.from(cardsEnDiv);
        cards.forEach((card) => {
            cardsHeores.removeChild(card);
        })
    }

    heroes.forEach((heroe) => {
        const card = cardHeroe(heroe);
        cardsHeores.insertAdjacentHTML('afterbegin', card);
    });
}

const guardarHeroe = (e) => {
    e.preventDefault();
    const tiempoActual = new Date();
    const inputsNode = e.target.querySelectorAll('input');
    const inputs = Array.from(inputsNode);
    let heroe = {}
    inputs.forEach((input) => {
        heroe[input.name] = input.value;
    });
    heroe.id = `${tiempoActual.getTime()}-${tiempoActual.getMilliseconds()}`;
    heroes.push(heroe);
    const heroesJson = JSON.stringify(heroes);
    localStorage.setItem('heroes', heroesJson);

    alertaGuardar.style.display = '';
    setTimeout(() => {
        alertaGuardar.style.display = 'none';
        mostrarTodosHerores();
        renderizarHeroes();
    }, 2000);
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

const buscarHeroe = (e) => {

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

    const resultado = heroes.filter((heroe) => {
        const nombre = heroe.nombre.toLowerCase();
        const alias = heroe.alias.toLowerCase();
        return nombre.includes(term) || alias.includes(term);
    });

    resultado.forEach((heroe) => {
        const li = itemSearch(heroe);
        resultadosBusqueda.insertAdjacentHTML('afterbegin', li);
    });

    if (!busquedasRecientes.includes(term)) {
        busquedasRecientes.push(term);
    }



    const busquedasJson = JSON.stringify(busquedasRecientes);
    localStorage.setItem('busquedas', busquedasJson);
    busquedasRecientes.forEach((termino) => {
        const li = itemBusquedaReciente(termino);
        busquedasRecientesList.append(li);
    });
}


init();