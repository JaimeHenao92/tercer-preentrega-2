
// me enlazo con los elementos HTML del detalle del préstamo
const spanMonto = document.querySelector("span.monto");
const spanDestino = document.querySelector("span.destino");
const spanTasa = document.querySelector("span.intereses");
const spanPlazo = document.querySelector("span.plazo");
const spanCuota = document.querySelector("span.cuota");
const spanTotalDevolver = document.querySelector("span.total");
const btnContratar = document.querySelector("button.button-contratar");
const divMensajeFinal = document.querySelector("div#panelMensaje");

// lógica
function recuperarDeLS() {
  const dtsDelPrestamo = JSON.parse(localStorage.getItem("DatosDelPrestamo"));
  if (dtsDelPrestamo !== "" && dtsDelPrestamo !== null) {
      spanMonto.textContent = dtsDelPrestamo.monto.toLocaleString("es-CO");
      spanDestino.textContent = dtsDelPrestamo.destino;
      spanTasa.textContent = parseFloat(((dtsDelPrestamo.interes - 1)*100).toFixed(2));
      spanPlazo.textContent = parseInt(dtsDelPrestamo.plazo);
      spanCuota.textContent = parseFloat(dtsDelPrestamo.cuota.toFixed(2));
      spanTotalDevolver.textContent = parseFloat(((dtsDelPrestamo.cuota * dtsDelPrestamo.plazo).toFixed(2)).toLocaleString("es-Co"));
  }
}

//Eventos
btnContratar.addEventListener("click", () => {
  divMensajeFinal.classList.add("transition-div-show");
  localStorage.removeItem("dtssDelPrestamo");
  btnContratar.setAttribute("disabled", "true");
});

// Inicializar la pantalla
recuperarDeLS();