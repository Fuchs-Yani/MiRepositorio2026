
let puntaje = 0; 
let preguntasDisponibles = []; 
let preguntasMostradas = 0; 
const LIMITE_PREGUNTAS = 5;
let dificultadElegida = "";


// Pantalla inicial → mostrar dificultades
function comenzarJuego(){
document.getElementById("btnComenzar").onclick = () => {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("dificultades").style.display = "block";
};

// Capturar clic en botones de dificultad
document.querySelectorAll(".btnDif").forEach(btn => {
  btn.onclick = () => {
    dificultadElegida = btn.dataset.dif;
    document.getElementById("dificultades").style.display = "none";
    document.getElementById("categorias").style.display = "block";
  };
});
}
function jugarTrivia(categoria) {
  document.getElementById("categorias").style.display = "none"; // ocultar categorías

  fetch('trivia.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const categ = data.categorias.find(c => c.nombre.toLowerCase() === categoria.toLowerCase());
      if (!categ || !categ.preguntas) {
        document.getElementById("preguntas").innerHTML = "<p>No hay preguntas para esa categoría</p>";
        return;
      }

      preguntasDisponibles = categ.preguntas
        .filter(p => p.nivel.toLowerCase() === dificultadElegida.toLowerCase())
        .sort(() => Math.random() - 0.5)
        .slice(0, LIMITE_PREGUNTAS);

      puntaje = 0;
      preguntasMostradas = 0;
      mostrarPregunta();
    })
    .catch(error => {
      document.getElementById("error").innerText = "Error cargando datos";
      console.error("Error cargando JSON:", error);
    });
}

function mostrarPregunta() {
  const contenedor = document.getElementById("preguntas");
  contenedor.innerHTML = "";

  if (preguntasMostradas >= LIMITE_PREGUNTAS || preguntasDisponibles.length === 0) {
    contenedor.innerHTML = `<h3>Juego terminado. Tu puntaje final: ${puntaje} / ${preguntasMostradas}</h3>`;
     document.getElementById("btnReiniciar").style.display = "inline";
    return;
  }

  const pregunta = preguntasDisponibles.pop(); 
  preguntasMostradas++;

  const opciones = [pregunta.correcta, ...pregunta.incorrectas].sort(() => Math.random() - 0.5);

  const bloque = document.createElement("div");
  bloque.classList.add("pregunta");

  const titulo = document.createElement("h4");
  titulo.textContent = `${preguntasMostradas}. ${pregunta.pregunta}`;
  bloque.appendChild(titulo);

  const dificultad = document.createElement("p");
  dificultad.textContent = `Dificultad: ${pregunta.nivel}`;
  bloque.appendChild(dificultad);

  opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = () => {
      if (op === pregunta.correcta) {
        puntaje++;
      }
      mostrarPregunta();
    };
    bloque.appendChild(btn);
  });

  const marcador = document.createElement("p");
  marcador.textContent = `Puntaje actual: ${puntaje}`;
  bloque.appendChild(marcador);

  contenedor.appendChild(bloque);
 
}
document.getElementById("btnReiniciar").addEventListener("click", () => {
   document.getElementById("btnReiniciar").style.display = "none";
  document.getElementById("inicio").style.display = "block";
  document.getElementById("preguntas").innerHTML = "";
  comenzarJuego();
  jugarTrivia();
});
comenzarJuego();

// Conectar botones de categorias
document.getElementById("btnCat1").onclick = () => jugarTrivia("Historia");
document.getElementById("btnCat2").onclick = () => jugarTrivia("GeografIa");
document.getElementById("btnCat3").onclick = () => jugarTrivia("Ciencia");
document.getElementById("btnCat4").onclick = () => jugarTrivia("Deportes");
document.getElementById("btnCat5").onclick = () => jugarTrivia("TecnologIa");
document.getElementById("btnCat6").onclick = () => jugarTrivia("Matematica");
