const btnContratar = document.querySelector("button.button-contratar");

// me enlazo con los elementos HTML del detalle del préstamo
const spanMonto = document.querySelector("span.label-monto");
const spanDestino = document.querySelector("span.label-destino");
const spanTasa = document.querySelector("span.label-intereses");
const spanPlazo = document.querySelector("span.label-plazo");
const spanCuota = document.querySelector("span.label-cuota");
const spanTotalDevolver = document.querySelector("span.label-total");
const divMensajeFinal = document.querySelector("div#panelMensaje");

// lógica
function recuperarDeLS() {
  const datosDelPrestamo = JSON.parse(localStorage.getItem("DatosDelPrestamo"));
  console.log(datosDelPrestamo);

  // si datosDelPrestamo no tiene info (null)
  // redireccionar al usuario a index.html

  spanMonto.textContent = "$ " + datosDelPrestamo.monto.toLocaleString("es-CO");
  spanDestino.textContent = datosDelPrestamo.destino;
  spanTasa.textContent = (datosDelPrestamo.interes - 1).toFixed(2);
  spanPlazo.textContent = datosDelPrestamo.plazo;
  spanCuota.textContent = datosDelPrestamo.cuota.toFixed(2);
  spanTotalDevolver.textContent = (
    datosDelPrestamo.cuota * datosDelPrestamo.plazo
  ).toLocaleString("es-Co");
}

// Eventos
btnContratar.addEventListener("click", () => {
  divMensajeFinal.classList.add("transition-div-show");
  localStorage.removeItem("DatosDelPrestamo");
  btnContratar.setAttribute("disabled", "true");
});

// Inicializar la pantalla
recuperarDeLS();
