export default class Heroes {

    personajes = [];
    busquedas = [];
    constructor() {
        this.cargarLocalPersonajes();
        this.cargaLocalBusquedas();
    }

    get personajes() {
        return this.personajes;
    }

    get busquedas() {
        return this.busquedas;
    }
    set personajes(personajes) {
        this.personajes = personajes;
    }

    set busquedas(busquedas) {
        this.busquedas = busquedas;
    }

    cargarLocalPersonajes() {
        const heroesLocales = localStorage.getItem('heroes');
        if (heroesLocales) {
            this.personajes = JSON.parse(heroesLocales);
        }
    }

    cargaLocalBusquedas() {
        const busquedasLocales = localStorage.getItem('busquedas');
        if (busquedasLocales) {
            this.busquedasLocales = JSON.parse(busquedasLocales);
        }
    }

    guardarStorage() {
        const heroesJson = JSON.stringify(this.personajes);
        localStorage.setItem('heroes', heroesJson);
    }
    guardarStorageBusqueda() {
        const busquedasJson = JSON.stringify(this.busquedas);
        localStorage.setItem('busquedas', busquedasJson);
    }


}