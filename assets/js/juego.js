const miModulo = (() => { //funcion anonima

    'use strict';

    //const personajes = ['Ana', 'Mercy', 'Mei'];
    //console.log(personajes);

    /**
     * 2C = Two of Clubs (Tréboles)
     * 2D = Two of Diamonds (Diamantes)
     * 2H = Two of Hearts (Corazones)
     * 2S = Two of Spades (Espadas o Picas)
     */

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    //let puntosJugador = 0,
    //    puntosComputadora = 0;

    let puntosJugadores = [];

    //referencias del HTML
    const btnNuevo = document.querySelector('#btnNuevo'), //Usando el document y a la vez el #btn se obtiene referencia del id del HTML
        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHtml = document.querySelectorAll('small');

    //Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {

        deck = crearDeck();
        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);

        }
        //console.log({ puntosJugadores });

        //puntosJugador = 0;
        //puntosComputadora = 0;

        //puntosHtml[0].innerText = 0;
        //puntosHtml[1].innerText = 0;

        puntosHtml.forEach(elem => elem.innerText = 0);

        //divCartasComputadora.innerHTML = '';
        //divCartasJugador.innerHTML = '';

        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }

    //Esta funcion crea un nuevo deck y lo entrega de forma aleatoria
    const crearDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }



        //console.log(deck);
        //deck = _.shuffle(deck);
        //console.log(deck);
        //return deck;
        return _.shuffle(deck);


    }




    //Funcion que permite tomar una nueva carta del deck
    const pedirCarta = () => {
        if (deck.leng === 0) {
            throw 'No quedan más cartas en el Deck';
        }

        //const carta = deck.pop();
        //console.log(deck);
        //console.log(carta);
        //return carta;

        return deck.pop();
    }

    //pedirCarta();

    //Funcion que le asiga valor a la carta seleccionada
    const valorCarta = (carta) => {

        //Version normal de la funcion
        //const valor = carta.substring(0, carta.length - 1); //esto permite extraer el valor de la carta sin su tipo (C,D,H,S)
        //let puntos = 0;

        //if (isNaN(valor)) {
        //    console.log('No es un Número');
        //    puntos = (valor === 'A') ? 11 : 10;
        //} else {
        //    console.log('Es un Número');
        //    puntos = valor * 1; //multiplicar por 1, permite que el valor string, pase a ser un numero entero
        // puntos = parseInt(valor); //forma clasica para pasar un número string a numero entero

        //}

        //console.log(puntos);

        //Version Optimizada

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;

    }

    //const valor = valorCarta(pedirCarta());
    //console.log({ valor });


    //turno: 0 es el primer jugador y el ultimo número es la computadora dentro del arreglo
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    };

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img'); //crea elemento de imagen, pero pueden ser de varios
        imgCarta.classList.add('carta'); //referencia al estilo
        imgCarta.src = `assets/cartas/${carta}.png`; //referencia a la fuente de la imagen
        divCartasJugadores[turno].append(imgCarta);
    };

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) {
                alert('nadie Gana');
            } else if (puntosMinimos > 21) {
                alert('Computadora Gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana');
            }

        }, 100);
    };

    //Turno de la Computadora

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            //puntosComputadora = puntosComputadora + valorCarta(carta);
            //puntosHtml[1].innerText = puntosComputadora;


            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            //const imgCarta = document.createElement('img'); //crea elemento de imagen, pero pueden ser de varios
            //imgCarta.classList.add('carta'); //referencia al estilo
            //imgCarta.src = `assets/cartas/${carta}.png`; //referencia a la fuente de la imagen
            //divCartasComputadora.append(imgCarta);

            //if (puntosMinimos > 21) {
            //    break;
            //}

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }


    //Evenetos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        //puntosJugador = puntosJugador + valorCarta(carta);
        //puntosHtml[0].innerText = puntosJugador;

        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        //const imgCarta = document.createElement('img'); //crea elemento de imagen, pero pueden ser de varios
        //imgCarta.classList.add('carta'); //referencia al estilo
        //imgCarta.src = `assets/cartas/${carta}.png`; //referencia a la fuente de la imagen
        //divCartasJugador.append(imgCarta);

        //validar no mas de 21 puntos
        if (puntosJugador > 21) {

            console.warn('Lo Siento Mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {

            console.warn('Has Logrado los 21 Puntos');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        }

    });

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);

    });

    //btnNuevo.addEventListener('click', () => {

    //    console.clear();
    //deck = [];
    //deck = crearDeck();

    //    inicializarJuego();



    //});

    return {
        nuevoJuego: inicializarJuego
    };

})();