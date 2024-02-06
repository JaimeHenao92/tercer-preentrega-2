class Prestamo {
    constructor(monto, plazo, interes) {
        this.monto = monto;
        this.plazo = plazo;
        this.interes = interes;
    }}
function calcularcuota() {
    let couta = (this.monto * this.interes) / this.plazo
    return couta
}