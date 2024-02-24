const URL = "../bancos.json";
const arrayBancos = [];

const inputMonto = document.querySelector("#montoDinero");
const inputPlazo = document.querySelector("#cuantoTiempo");
const selectBancos = document.querySelector("#banco");
const imagenCargar = '<img src="../fotos/animacion-cargando.gif">';
const btnCalcular = document.querySelector("#btnCalcular");
const divMensaje = document.querySelector("#mensaje");
const contenedorDiv = document.querySelector("div.cotizacion");

function cargarBancos() {
  if (arrayBancos.length > 0) {
    arrayBancos.forEach((banco) => {
      const optionElement = document.createElement("option");
      optionElement.value = banco.descripcion;
      optionElement.textContent = banco.descripcion;
      selectBancos.appendChild(optionElement);
    });
  }
};

function retornarCardError() {
  return `<div class="cotizacion">
              <p>
                  ⛔⛔⛔
              </p>
              <h3>ERROR AL CARGAR</h3>
              <h4>POR FAVOR RECARGA LA PÁGINA..</h4>
          </div>`
};

function obtenerIntereses() {
  fetch(URL)
  .then((response)=> {
      if (response.ok) {
          return response.json()
      } else {
          throw new Error("No se pudo obtener la información solicitada. (" + response.status + ")")
      }
  } )
  .then((data)=> arrayBancos.push(...data) )
  .then(()=> cargarBancos())
  .catch((error)=> {
    contenedorDiv.innerHTML = retornarCardError()
  })
  
};

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
  let caso1 = inputMonto.value;
  let caso2 = inputPlazo.value;
  let caso3 = selectBancos.value;

  if (caso1 !== "" && caso2 !== "" && caso3 !== "Elige una opción, por favor") {
      
      btnCalcular.innerHTML = imagenCargar;

    
      setTimeout(() => {
          calcularPrestamo();
      }, 3000);
  } else {
      // Mostrar mensaje de SweetAlert para revisar los datos
      revisarDatos();
  }
});

// Función para mostrar el mensaje de SweetAlert
function revisarDatos() {
  Swal.fire({
      title: "Revisar datos",
      text: "Por favor, completa todos los campos antes de calcular.",
      icon: "warning"
  });
}

// Inicializamos la aplicación
obtenerIntereses()
