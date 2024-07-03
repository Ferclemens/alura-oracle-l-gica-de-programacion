let numeroSecreto;
let NumerosSecretosGenerados = [];
let intentos = 1;
let intentosMaximos = 5;
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `Acertaste el número en ${intentos} ${intentos === 1 ? "vez" : "veces"}`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
    document.getElementById("intentar").disabled = true;
  } else {
    //El usuario no acertó.
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El número secreto es menor");
    } else {
      asignarTextoElemento("p", "El número secreto es mayor");
    }
    if (intentos <= intentosMaximos) {
      intentos++;
    } else {
      asignarTextoElemento(
        "p",
        `Alcanzaste el número máximo de intentos (${intentosMaximos}), game over :(`
      );
      document.getElementById("reiniciar").removeAttribute("disabled");
      document.getElementById("intentar").disabled = true;
      limpiarCaja();
    }
    limpiarCaja();
  }
  return;
}

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  //console.log(numeroGenerado);
  //console.log(NumerosSecretosGenerados);
  if (NumerosSecretosGenerados.length === numeroMaximo) {
    asignarTextoElemento(
      "p",
      "Ya se sortearon todos los números posibles, reinicie la ventana con f5"
    );
  } else {
    if (NumerosSecretosGenerados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      NumerosSecretosGenerados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del número secreto!");
  asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
  numeroMaximo = 10;
  //console.log(numeroSecreto);
}

function reiniciarJuego() {
  //limpiar caja
  limpiarCaja();
  document.getElementById("intentar").disabled = false;
  //Indicar mensaje de intervalo de números
  //Generar el número aleatorio
  //Inicializar el número intentos
  condicionesIniciales();
  //Deshabilitar el botón de nuevo juego
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

condicionesIniciales();
