const juego = document.querySelector("#Tablero")
const mostrar_info = document.querySelector("#informacion")
const celdas= [
    "", "", "", "", "", "", "", "", ""
]
let turno="circulo"
mostrar_info.textContent="Empieza el circulo"


function crearTablero(){
    celdas.forEach((_celda,index)=> {
    const ElementCelda = document.createElement('div') 
    //ElementCelda es una constante que se refiere a un nuevo elemento div que creamos en la función crearTablero(). 
    //Seria como un bloque visual en el tablero, una celda en la que un jugador puede hacer clic para hacer su movimiento.

    ElementCelda.classList.add('cuadrado') //Le damos la clase cuadrado al recuadro de la celda para poder modificarlo
    ElementCelda.id=index //Le damos el valor del id en base a la posicion en el array de celdas
    ElementCelda.addEventListener('click', addTurno) //Cuando se haga click en la celda, se ejecutara addTurno
    juego.append(ElementCelda) //Añade el ElementCelda al tablero en el DOM
    
    }) //Se cierra el for each

}

crearTablero();

function addTurno(e){ //Recibimos el click como evento 
    const TurnoDisplay = document.createElement('div') //Crea un nuevo elemento div que almacenará el turno actual (círculo o cruz).
    TurnoDisplay.classList.add(turno) //Añade la clase actual del turno (ya sea "circulo" o "cruz") a TurnoDisplay.
    e.target.append(TurnoDisplay) //Añade el elemento TurnoDisplay al elemento que disparó el evento de clic (e.target), es decir, la celda en la que se hizo clic.

    turno= turno ==="circulo"? "cruz" : "circulo" 
    //La lógica detrás de esto es alternar entre los turnos de los jugadores. Si el turno actual es "circulo", entonces cambia a "cruz". Si no es "circulo" (es decir, es "cruz"), entonces cambia a "circulo".

    mostrar_info.textContent=" Es el turno de " + turno  //Actualiza el contenido textual del elemento mostrar_info para reflejar el turno actual.
    e.target.removeEventListener("click",addTurno) // elimina el detector de eventos de la celda en la que se hizo clic, lo que evita que se vuelva a hacer clic en ella.
    VerPuntos() //Llama a la función VerPuntos para verificar si alguien ha ganado.
}

function VerPuntos(){
    const TodosCuadrados = document.querySelectorAll(".cuadrado") //devuelve una lista de todos los elementos con la clase 'cuadrado'.
    const CombosVictoria= [ //Define las combinaciones ganadoras de tres en línea
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]

    CombosVictoria.forEach(array=>{ //Itera sobre cada combinación ganadora.

        const CirculoGana= array.every(celda=> TodosCuadrados[celda].firstChild?.classList.contains('circulo')) 
        // Para cada combinación, verificamos si todas las celdas tienen un hijo (un div) con la clase 'circulo'. Si todas las celdas en esa combinación tienen una cruz, CirculoGana  será verdadero.
        if (CirculoGana){
            mostrar_info.textContent="Circulo Gana"
            TodosCuadrados.forEach(cuadrado => { //Esto itera sobre cada cuadrado o celda del tablero
                cuadrado.removeEventListener('click', addTurno); 
                //Lo que estamos haciendo aquí es eliminar el detector de eventos 'click' que se agregó anteriormente a cada cuadrado.
                //El parametro click es el comportamiento que queremos remover y addTurno, es la función que se había establecido para manejar el evento de click
            });
            return 
        }
    })

    CombosVictoria.forEach(array=>{ // Aquí, estamos revisando las combinaciones ganadoras para el jugador "cruz".
        const CruzGana= array.every(celda=> TodosCuadrados[celda].firstChild?.classList.contains('cruz'))

        if (CruzGana){
            mostrar_info.textContent="Cruz Gana"
            TodosCuadrados.forEach(cuadrado => {
                cuadrado.removeEventListener('click', addTurno); 
            });
            return 
        }
    })
    
}


    
