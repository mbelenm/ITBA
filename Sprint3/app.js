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


function precioCompra(precioCompra) {
  compra = document.createElement("p");
  compra.innerHTML = "Compra " + "<br>" + "$ " + precioCompra;
  return compra;
}

function obtenerNombre(nombreDivisa) {
  let nombre = document.createElement("p");
  nombre.setAttribute("class", "fs-3 fw-bold");
  nombre.innerHTML = nombreDivisa;
  return nombre;
}

function precioVariacion(precioVariacion) {
  variacion = document.createElement("p");
  variacion.innerHTML = "Variación: " + precioVariacion;
  return variacion;
}

function precioVenta(precioVenta) {
  venta = document.createElement("p");
  venta.innerHTML = "Venta " + "<br>" + "$ " + precioVenta;
  return venta;
} 


fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => {
      if (
        element.casa.nombre != "Argentina" &&
        element.casa.nombre != "Dolar Soja"
      ) {
        let auxDiv = document.createElement("a");
        let precios = document.createElement("a");

        nombre = obtenerNombre(element.casa.nombre);

        compra = precioCompra(element.casa.compra);
        precios.append(compra);

        venta = precioVenta(element.casa.venta);
        precios.append(venta);

        variacion = precioVariacion(element.casa.variacion);
        
        if (element.casa.variacion > 0) {
          variacion.setAttribute(" class ", " fc-green");
        } else {
          variacion.setAttribute("class", " fc-red");
        }
        precios.append(variacion);



        auxDiv.append(nombre, precios, variacion, date, );
        divisas.append(auxDiv);
      }
    });
  });
