let opcion;

//Array productos
const productos = [
    { id: 1, nombre: "camara canon", precio: 165000, cantidad: 9 },
    { id: 2, nombre: "camara nikon", precio: 135960, cantidad: 4, },
    { id: 3, nombre: "soporte canon", precio: 27055, cantidad: 15, },
    { id: 4, nombre: "soporte nikon", precio: 19000, cantidad: 19, },
    { id: 5, nombre: "memoria sd", precio: 37000, cantidad: 10, },
];

//Array vacio
const productosDos = [];

//Clase producto con su respectivo constructor
class producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = cantidad;
        this.disponible = true;
    }
}

cargarProductos(productos);

function cargarProductos(arr) {
    const prod = document.getElementById("productos")

    for (const producto of arr) {
        const li = document.createElement('li')
        li.innerHTML = `<div class="card">
                        <h3> ${producto.nombre}</h3>
                        <p>Precio: $${producto.precio}</p>
                        <p>Disponibles: ${producto.cantidad}</p>
                        </div>`
        prod.appendChild(li)
    }
}

function convertirANumero(texto) {
    return parseFloat(texto);
};

function vaciarArray(arr){
    while (productos.length > 0) {
        productosDos.push(productos.splice(0, 1)[0]);
    }
}

// function apretarBoton() {
//     let monto = 0;
//     let cantidad = 0;
//     ingresarValor();
//     while (opcion != "6") {
//         switch (opcion) {
//             case "1":
//                 cantidad = convertirANumero(prompt("Ingrese cantidad"));
//                 monto += (165000 * cantidad);
//                 break;
//             case "2":
//                 cantidad = convertirANumero(prompt("Ingrese cantidad"));
//                 monto += (135960 * cantidad);
//                 break;
//             case "3":
//                 cantidad = convertirANumero(prompt("Ingrese cantidad"));
//                 monto += (27055 * cantidad);
//                 break;
//             case "4":
//                 cantidad = convertirANumero(prompt("Ingrese cantidad"));
//                 monto += (19000 * cantidad);
//                 break;
//             case "5":
//                 cantidad = convertirANumero(prompt("Ingrese cantidad"));
//                 monto += (37000 * cantidad);
//                 break;
//             default:
//                 alert("Opción no valida")
//         }
//         ingresarValor();
//     };

//     alert("El monto total de tu compra es $" + monto);

// }

function botonAgregar() {
    let ul = document.querySelector("ul#productos");
    ul.innerHTML = "";

    while (productos.length > 0) {
        productosDos.push(productos.splice(0, 1)[0]);
    }

    let inputNombre = document.getElementById('nombre');
    let inputPrecio = document.getElementById('precio');
    let inputCantidad = document.getElementById('cantidad');
    let nombreP = inputNombre.value;
    let precioP = inputPrecio.value;;
    let cantidadP = inputCantidad.value;;
    productosDos.push(new producto(nombreP, precioP, cantidadP));

    cargarProductos(productosDos);
    inputNombre.value = '';
    inputPrecio.value = '';
    inputCantidad.value = '';
};

function botonBuscar() {
    productosDos.length = 0
    let ul = document.querySelector("ul#productos");
    let inputNombre = document.getElementById('nombre');
    ul.innerHTML = "";

    let productostres= productos.filter((productos) => productos.nombre.includes(inputNombre.value));

    cargarProductos(productostres);
    inputNombre.value = '';
    inputPrecio.value = '';
    inputCantidad.value = '';
}
