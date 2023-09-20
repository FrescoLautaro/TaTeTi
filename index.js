const juego = document.querySelector("#Tablero");
const mostrar_info = document.querySelector("#informacion");
let turno = "circulo";

mostrar_info.textContent = "Empieza el circulo";

function crearTablero() {
    for (let i = 0; i < 9; i++) {
        const ElementCelda = document.createElement('div'); //Creamos un nuevo elemento del tipo div y lo asignamos a la constante "ElementCelda". Este div representará una celda individual en nuestro tablero.
        ElementCelda.setAttribute('data-value', '');
        //Establecemos un atributo llamado "data-value" para el elemento "ElementCelda" y lo inicializamos con una cadena vacía. 
        //Este atributo nos puede ayudar a rastrear el estado de esta celda (si está vacía, tiene un círculo o una cruz) más adelante en el juego.
        ElementCelda.classList.add('cuadrado');
        //Añadimos la clase "cuadrado" al elemento "ElementCelda". Esto es para poder aplicar estilos CSS a todas las celdas usando esta clase. 
        ElementCelda.addEventListener('click', addTurno);
        //Añadimos un detector de eventos a "ElementCelda".
        juego.append(ElementCelda);
        //Finalmente, agregamos "ElementCelda" (nuestra celda individual) al contenedor principal del tablero (9 celdas)
    }
}

crearTablero();

function addTurno(e) { //Esta función se invoca cada vez que se hace clic en una celda del tablero. El parámetro e es el evento del clic.
    const celda = e.target; 
    //Capturamos el elemento específico en el que se hizo clic. e.target es una propiedad del evento e que referencia al elemento HTML en el que se originó el evento. 
    //En este contexto, es la celda individual en la que el jugador hizo clic.
    if (celda.getAttribute('data-value') === '') { //Verificamos si la celda está vacía, si lo esta, se puede jugar en ella
        celda.setAttribute('data-value', turno); //Marcamos la celda con el turno actual
        turno = turno === "circulo" ? "cruz" : "circulo"; //Cambiamos el turno al siguiente jugador. Si el turno actual es "circulo", lo cambiamos a "cruz", y viceversa. 
        mostrar_info.textContent = "Es el turno de " + turno; 
        celda.removeEventListener("click", addTurno); 
        VerPuntos(); 
    }
}

function VerPuntos() {
    const TodosCuadrados = document.querySelectorAll(".cuadrado"); //Aquí estamos obteniendo todos los elementos que representan las celdas del juego. Estos tienen la clase .cuadrado.

    const CombosVictoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of CombosVictoria) { //Aquí estamos recorriendo cada posible combinación ganadora
        const CirculoGana = combo.every(celda => TodosCuadrados[celda].getAttribute('data-value') === 'circulo'); 
        //Para cada combinación, estamos usando el método every para ver si todas las celdas en esa combinación específica tienen un círculo. Si es así, eso significa que el círculo ha ganado.

        if (CirculoGana) { //Si encontramos que el círculo ha ganado, mostramos un mensaje y bloqueamos las celdas para que no se puedan hacer más movimientos.
            mostrar_info.textContent = "Circulo Gana";
            mostrarCartel("¡Círculo gana!");
            bloquearCeldas();
            return;
        }

        const CruzGana = combo.every(celda => TodosCuadrados[celda].getAttribute('data-value') === 'cruz');

        if (CruzGana) { 
            mostrar_info.textContent = "Cruz Gana";
            mostrarCartel("¡Cruz gana!");
            bloquearCeldas();
            return;
        }
    }
    const todasLasCeldasLlenas = Array.from(TodosCuadrados).every(celda => celda.getAttribute('data-value') !== ''); 
    //Este código verifica si todas las celdas están ocupadas (es decir, tienen un valor que no es una cadena vacía). Si todas están ocupadas y no hemos encontrado un ganador, entonces declaramos un empate.
    if (todasLasCeldasLlenas) {
        mostrar_info.textContent = "Es un empate!";
        mostrarCartel("¡Es un Empate!")
    }
}

function mostrarCartel(mensaje) {
    const cartel = document.createElement('div');
    cartel.id = 'cartel'; //Le asignamos un identificador "cartel" al elemento div que acabamos de crear.
    cartel.innerText = mensaje; //Establecemos el contenido de texto del elemento cartel al valor del parámetro mensaje que se pasó a la función. 
    cartel.addEventListener('click', () => { ////Aquí estamos añadiendo un detector de eventos al cartel. Esto significa que cuando alguien haga clic en el cartel, se ejecutará la función proporcionada.
        cartel.remove();
        location.reload(); 
    });
    //cartel.remove();: Esta línea elimina el cartel del DOM. En otras palabras, una vez que hagas clic en el cartel, desaparecerá de la pantalla.
    //location.reload();: Esta línea recarga la página. Al hacerlo, se reiniciará el juego ya que toda la página web se recargará desde el principio.

    document.body.appendChild(cartel);
    //Por último, añadimos el cartel (el elemento div que hemos estado preparando) al cuerpo (body) de nuestro documento. Esto hará que el cartel se muestre en la página web.
}

function bloquearCeldas() {
    const TodosCuadrados = document.querySelectorAll(".cuadrado"); //Aquí, estamos seleccionando todos los elementos del DOM que tienen la clase "cuadrado". 
    TodosCuadrados.forEach(cuadrado => { //iterar a través de cada celda en nuestra lista TodosCuadrados
        cuadrado.removeEventListener('click', addTurno); //estamos "bloqueando" o "desactivando" todas las celdas para que no se puedan clicar
    });
}


    
