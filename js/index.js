const arrayBancos = [
  { id: 1, descripcion: "BANCOLOMBIA", interes: 1.1821 },
  { id: 2, descripcion: "BBVA", interes: 1.138 },
  { id: 3, descripcion: "Banco de Occidente", interes: 1.1021 },
  { id: 4, descripcion: "Banco Agrario", interes: 1.081 },
  { id: 5, descripcion: "Banco de Bogota ", interes: 1.112 },
];

const inputMonto = document.querySelector("#montoDinero");
const inputPlazo = document.querySelector("#cuantoTiempo");
const selectBancos = document.querySelector("#banco");
const btnCalcular = document.querySelector("#btnCalcular");
const divMensaje = document.querySelector("#mensaje");

function cargarBancos() {
  if (arrayBancos.length > 0) {
    arrayBancos.forEach((banco) => {
      const optionElement = document.createElement("option");
      optionElement.value = banco.descripcion;
      optionElement.textContent = banco.descripcion;
      selectBancos.appendChild(optionElement);
    });
  }
}

function obtenerInteresPorDescripcion(descripcion) {
  const destino = arrayBancos.find(
    (destino) => destino.descripcion === descripcion
  );
  return destino ? destino.interes : 0;
}

function guardarEnLocalStorage(monto, plazo, interes, cuota, destino) {
  const datosDelPrestamo = {
    monto : monto,
    plazo : plazo,
    interes : interes,
    cuota : cuota,
    destino : destino
  };

  localStorage.setItem("DatosDelPrestamo", JSON.stringify(datosDelPrestamo));
}



function calcularPrestamo() {
  const monto = parseFloat(inputMonto.value);
  const plazo = parseInt(inputPlazo.value);
  const interes = obtenerInteresPorDescripcion(selectBancos.value);
  const destino = selectBancos.value
  creditoSolicitado = new Prestamo (monto, plazo, interes)

  let cuota = creditoSolicitado.calcularcuota()

  guardarEnLocalStorage(
    monto,
    plazo,
    interes,
    cuota,
    destino,
  );
  location.href = "cotizacion.html";
}

// Evento
btnCalcular.addEventListener("click", () => {
  let caso1=inputMonto.value;
  let caso2=inputPlazo.value;
  let caso3=selectBancos.value
  if (caso1 !== null && caso2 !== null && caso3 !== "Elige una opción, por favor") {
    calcularPrestamo()
  }
  else {
    divMensaje.classList.add("transition-div-show");
  }
});

// Inicializamos la aplicación
cargarBancos();