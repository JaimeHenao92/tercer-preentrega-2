class Prestamo {
  constructor(monto, plazo, interes) {
    this.monto = monto || 1;
    this.plazo = plazo || 1;
    this.interes = interes || 1;
  }
calcularcuota(){
  let cuota = (this.monto * this.interes) / this.plazo;
  return cuota;
}
}