let numeros = [];
const cantidad = 4;
let suma = 0;
let timer;

function generarNumeros(cantidad) {
  do {
    numeros = [];
    for (let i = 0; i < cantidad; i++) {
      let num = Math.floor(Math.random() * 21); 
      numeros.push(num);
    }
    let posNeg = Math.floor(Math.random() * cantidad);
    let negativo = -Math.floor(Math.random() * 10 + 1);
    numeros[posNeg] = negativo;

    suma = numeros.reduce((acc, val) => acc + val, 0);
  } while (suma < 0);

}//genero los numeros positivos luego agrego uno negativo en una posicion al azar.

function iniciarTemporizador(segundos) {
  clearInterval(timer); // limpia el timer
  let tiempo = segundos;
  const resultado = document.getElementById("resultado");

  resultado.textContent = `Tiempo restante: ${tiempo}s`;

  timer = setInterval(() => {
    tiempo--;
    resultado.textContent = `Tiempo restante: ${tiempo}s`;

    if (tiempo <= 0) {
      clearInterval(timer);
      resultado.textContent = `¡Se acabó el tiempo! La suma era: ${suma}`;
      document.getElementById("btnReiniciar").style.display = "inline";
    }
  }, 1000);
}

function mostrarNumeros() {
  const contenedor = document.getElementById("numeros");
  contenedor.textContent = "";

  numeros.forEach((num, i) => {
    setTimeout(() => {
      contenedor.textContent = num;
      setTimeout(() => contenedor.textContent = "", 1000);
    }, i * 1500);
  }); //mostrar los numeros uno por uno cad 1.5 segundos.

  const duracionSecuencia = cantidad * 1500;
  setTimeout(() => iniciarTemporizador(10), duracionSecuencia);
  console.log("numeros:",numeros," suma:", suma);
}

// --- EVENTOS ---
document.getElementById("btnEnviar").addEventListener("click", () => {
  let respuesta = parseInt(document.getElementById("numero").value);
  let resultado = document.getElementById("resultado");

  clearInterval(timer); // detiene el temporizador al responder

  if (respuesta === suma) {
    resultado.textContent = "¡Respuesta Correcta! ";
    resultado.style.color = "green";
  } else {
    resultado.textContent = `Respuesta Incorrecta. La suma era: ${suma}`;
    resultado.style.color = "red";
  }

  document.getElementById("btnReiniciar").style.display = "inline";
});

document.getElementById("btnReiniciar").addEventListener("click", () => {
  document.getElementById("numeros").textContent = "";
  document.getElementById("numero").value = "";
  document.getElementById("resultado").textContent = "";
  document.getElementById("btnReiniciar").style.display = "none";

  generarNumeros(cantidad);
  mostrarNumeros();
});

document.getElementById("btnComenzar").addEventListener("click", () => {
  document.getElementById("numeros").textContent = "";
  document.getElementById("numero").value = "";
  document.getElementById("resultado").textContent = "";
  document.getElementById("btnReiniciar").style.display = "none";

  generarNumeros(cantidad);
  mostrarNumeros();

  document.getElementById("btnComenzar").style.display = "none";
});
