const divisas = document.getElementById("divisas");
const hoy = new Date();
let date =
  "Último: " +
  hoy.getDate() +
  "/" +
  (hoy.getMonth() + 1) +
  "/" +
  hoy.getFullYear() +
  " Hora:" +
  hoy.getHours() +
  ":" +
  hoy.getMinutes();

function obtenerNombre(nombreDivisa) {
  let nombre = document.createElement("p");
  nombre.setAttribute("class", "fs-3 fw-bold");
  nombre.innerHTML = nombreDivisa;
  return nombre;
}
function valorCompra(valorCompra) {
  compra = document.createElement("p");
  compra.innerHTML = "Compra " + "<br>" + "$ " + valorCompra;
  return compra;
}
function valorVenta(valorVenta) {
  venta = document.createElement("p");
  venta.innerHTML = "Venta " + "<br>" + "$ " + valorVenta;
  return venta;
}
function valorVariacion(valorVariacion) {
  variacion = document.createElement("p");
  variacion.innerHTML = "Variación: " + valorVariacion;
  return variacion;
}
fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => {
      if (
        element.casa.nombre != "Bitcoin" &&
        element.casa.nombre != "Argentina" &&
        element.casa.nombre != "Dolar Soja"
      ) {
        let auxDiv = document.createElement("a");
        let precios = document.createElement("a");

        nombre = obtenerNombre(element.casa.nombre);

        compra = valorCompra(element.casa.compra);
        precios.append(compra);

        venta = valorVenta(element.casa.venta);
        precios.append(venta);

        variacion = valorVariacion(element.casa.variacion);

        auxDiv.append(nombre);
        auxDiv.append(precios);
        auxDiv.append(variacion);
        auxDiv.append(date);
        divisas.append(auxDiv);
      }
    });
  });
