
const arrayBancos = [
    {id: 1, descripcion: 'BANCOLOMBIA', interes: 18.21},
    {id: 2, descripcion: 'BBVA', interes: 13.8},
    {id: 3, descripcion: 'Banco de Occidente', interes: 10.21},
    {id: 4, descripcion: 'Banco Agrario', interes: 8.10},
  {id: 5, descripcion: 'Banco de Bogota ', interes: 11.2}
];

const inputMonto = document.querySelector("#montoDinero");
const inputPlazo = document.querySelector("#cuantoTiempo");
const selectBancos = document.querySelector("#selec");
const btnCalcular = document.querySelector("#btnCalcular");
const divMensaje = document.querySelector("#mensaje");

function cargarBancos() {
if (arrayBancos.length > 0) {
   arrayBancos.forEach((banco)=> {
       selectBancos.innerHTML += `<option>${banco.descripcion}</option>`
   })
}
}

function obtenerInteresPorDescripcion(descripcion) {
const destino = arrayDestinos.find((destino) => destino.descripcion === descripcion);
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

function calcularPrestamo() {
const monto = parseInt(inputMonto.value);
const plazo = parseInt(inputPlazo.value);
const interes = obtenerInteresPorDescripcion(selectDestinos.value);

const prestamo = new Prestamo(monto, plazo, interes);
const cuotaMensual = prestamo.calcularCuota();

guardarEnLocalStorage(monto, plazo, interes, cuotaMensual, selectDestinos.value);
location.href = "cotizacion.html";
}

btnCalcular.addEventListener("click", ()=> calcularPrestamo())

// Inicializamos la aplicación
cargarBancos();