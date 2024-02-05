const btnContratar = document.querySelector("#btnContratar");

// Enlace con los elementos HTML del detalle del préstamo
const spanMonto = document.querySelector("#spanMontoDinero");
const spanDestino = document.querySelector("#spanDestino");
const spanTasa = document.querySelector("#spanTasa");
const spanPlazo = document.querySelector("#spanPlazo");
const spanCuota = document.querySelector("#spanCuota");
const spanTotalDevolver = document.querySelector("#spanTotalDevolver");
const divMensajeFinal = document.querySelector("#panelMensajeFinal");

// Lógica
class DetallePrestamo {
    constructor(datosPrestamo) {
        this.datosPrestamo = datosPrestamo;
    }

    mostrarDetalle() {
        spanMonto.textContent = `$ ${this.datosPrestamo.monto.toLocaleString("es-Co")}`;
        spanDestino.textContent = this.datosPrestamo.destino;
        spanTasa.textContent = ((this.datosPrestamo.interes - 1) * 100).toFixed(2);
        spanPlazo.textContent = this.datosPrestamo.meses;
        spanCuota.textContent = this.datosPrestamo.cuota.toFixed(2);
        spanTotalDevolver.textContent = (this.datosPrestamo.cuota * this.datosPrestamo.meses).toLocaleString("es-AR");
    }
}

function recuperarDeLocalStorage() {
    const datosDelPrestamo = JSON.parse(localStorage.getItem("DatosDelPrestamo"));

    // Si datosDelPrestamo no tiene información (null)
    // redireccionar al usuario a index.html
    if (!datosDelPrestamo) {
        location.href = "index.html";
    }

    const detallePrestamo = new DetallePrestamo(datosDelPrestamo);
    detallePrestamo.mostrarDetalle();
}

// Eventos
btnContratar.addEventListener("click", () => {
    divMensajeFinal.classList.add("transition-div-show");
    localStorage.removeItem("DatosDelPrestamo");
    btnContratar.setAttribute("disabled", true);
});

// Inicializar la pantalla
recuperarDeLocalStorage();
