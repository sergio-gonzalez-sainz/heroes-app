import { elementos, heroes } from './global.js';


const cardHeroe = (heroe) => {
    const card = `<div class="card col-sm-4">
        <img src="${heroe.imagen}" class="img-card-custom" >
        <div class="card-body">
            <h5 class="card-title">${heroe.alias}</h5>
            <p class="card-text">Nombre Real: ${heroe.nombre}</p>
            <div class = "d-flex justify-content-end gap-3">
                <button class="btn btn-primary"><i class="fa-solid fa-paintbrush"></i></button>
                <button onclick="eliminarHeroe('${heroe.id}')" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>

    </div>`;
    return card;
}

const renderizarHeroes = (heroes) => {
    const cardsEnDiv = cardsHeores.children;
    if (cardsEnDiv.length > 0) {
        const cards = Array.from(cardsEnDiv);
        cards.forEach((card) => {
            cardsHeores.removeChild(card);
        })
    }
    heroes.forEach((heroe) => {
        const card = cardHeroe(heroe);
        elementos.cardsHeores.insertAdjacentHTML('afterbegin', card);
    });
}

window.eliminarHeroe = (id) => {
    const eliminar = confirm('¿Deseas eliminar este héroe?');
    console.log(id);
    if (eliminar == true) {
        const data = heroes.personajes.filter((heroe) => {
            return heroe.id != id;
        });
        console.log(data);
        heroes.personajes = data;
        heroes.guardarStorage();
        renderizarHeroes(heroes.personajes);
    }

}

export const initTodosHeroes = () => {
    renderizarHeroes(heroes.personajes);
}