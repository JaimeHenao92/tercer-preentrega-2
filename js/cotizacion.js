// me enlazo con los elementos HTML del detalle del préstamo
const spanMonto = document.querySelector("span.monto");
const spanDestino = document.querySelector("span.destino");
const spanTasa = document.querySelector("span.intereses");
const spanPlazo = document.querySelector("span.plazo");
const spanCuota = document.querySelector("span.cuota");
const spanTotalDevolver = document.querySelector("span.total");
const imagenContratar = '<img src="../fotos/animacion-cargando.gif">';
const btnContratar = document.querySelector("button.button-contratar");
const divMensajeFinal = document.querySelector("div#panelMensaje");

// lógica
function recuperarDeLS() {
  const dtsDelPrestamo = JSON.parse(localStorage.getItem("DatosDelPrestamo"));

  if (dtsDelPrestamo !== "" && dtsDelPrestamo !== null) {
      const formatter = new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          
      });

      const formatNumberWithPoints = (number) => {
          return formatter.format(number);
      };

      spanMonto.textContent = formatNumberWithPoints(dtsDelPrestamo.monto) + " COP";
      spanDestino.textContent = dtsDelPrestamo.destino;
      spanTasa.textContent = parseFloat(((dtsDelPrestamo.interes - 1) * 100).toFixed(2));
      spanPlazo.textContent = parseInt(dtsDelPrestamo.plazo);
      spanCuota.textContent = formatNumberWithPoints(dtsDelPrestamo.cuota) + " COP";
      spanTotalDevolver.textContent = formatNumberWithPoints(dtsDelPrestamo.cuota * dtsDelPrestamo.plazo) + " COP";
  }
}



//Eventos
btnContratar.addEventListener("click", () => {
  // Deshabilitar el botón y cambiar su contenido
  btnContratar.setAttribute("disabled", "true");
  btnContratar.innerHTML = imagenContratar;

  // temporizador para mostrar el aviso después de 2 segundos
  setTimeout(() => {
    limpiarDatosPrestamo();
    mostrarMensajeFinal();
  }, 2000);
});

function limpiarDatosPrestamo() {
  // Limpiar o restablecer los datos almacenados
  localStorage.removeItem("DatosDelPrestamo");
}

function mostrarMensajeFinal() {
  Swal.fire({
    title: "¡Contrato exitoso!",
    text: "Gracias por elegir nuestros servicios.",
    icon: "success",
    willClose: () => {
      // Redirigir al formulario del préstamo después de hacer clic en "OK"
      location.href = "prestamos.html";
    }
  });
}

// Inicializar la pantalla
recuperarDeLS();
