const arrayBancos = [
  { id: 1, descripcion: "BANCOLOMBIA", interes: 18.21 },
  { id: 2, descripcion: "BBVA", interes: 13.8 },
  { id: 3, descripcion: "Banco de Occidente", interes: 10.21 },
  { id: 4, descripcion: "Banco Agrario", interes: 8.1 },
  { id: 5, descripcion: "Banco de Bogota ", interes: 11.2 },
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
    monto,
    plazo,
    interes,
    cuota,
    destino,
  };

  localStorage.setItem("DatosDelPrestamo", JSON.stringify(datosDelPrestamo));
}

const calcularCuota = (monto, interes, plazo) => {
  const couta = (monto * interes) / plazo;
  return couta;
};

function calcularPrestamo() {
  const monto = parseInt(inputMonto.value);
  console.log(monto);
  const plazo = parseInt(inputPlazo.value);
  const interes = obtenerInteresPorDescripcion(selectBancos.value);
  const cuotaMensual = calcularCuota(monto, plazo, interes);
  console.log(cuotaMensual);

  guardarEnLocalStorage(
    monto,
    plazo,
    interes,
    cuotaMensual,
    selectBancos.value
  );
  location.href = "cotizacion.html";
}

btnCalcular.addEventListener("click", () => calcularPrestamo());

// Inicializamos la aplicación
cargarBancos();
