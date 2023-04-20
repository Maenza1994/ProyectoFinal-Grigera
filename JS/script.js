//Variables
//Inputs Compras.html
const btnFiltrar = document.querySelector("#btnFiltrar"),
    filtroNombre = document.querySelector("#filtroNombre"),
    filtroDesde = document.querySelector("#filtroDesde"),
    filtroHasta = document.querySelector("#filtroHasta"),
    btnAgregar = document.querySelector("#btnAgregar"),
    btnGuardarLocal = document.querySelector("#btnGuardarLocal"),
    btnRecuperarLocal = document.querySelector("#btnRecuperarLocal"),
    txtNombre = document.querySelector("#agregarNombre"),
    txtPrecio = document.querySelector("#agregarPrecio");

//Arrays
const productos = [
    { id: 1, nombre: "camara canon", precio: 165000, imagen: "camara canon" },
    { id: 2, nombre: "camara nikon", precio: 135960, imagen: "camara nikon" },
    { id: 3, nombre: "soporte canon", precio: 27055, imagen: "soporte canon" },
    { id: 4, nombre: "soporte nikon", precio: 19000, imagen: "soporte nikon" },
    { id: 5, nombre: "memoria sd", precio: 37000, imagen: "memoria sd" },
    { id: 6, nombre: "baterias nikon", precio: 19000, imagen: "baterias nikon" },
    { id: 7, nombre: "baterias sony", precio: 21000, imagen: "baterias sony" },
    { id: 8, nombre: "camara sony", precio: 180650, imagen: "camara sony" },
    { id: 9, nombre: "gimball", precio: 101000, imagen: "gimball" },
],
    arrMostrarProductos = [];

//Clase producto con su respectivo constructor
class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.imagen = imagen;
    }
}

//Load de la pagina
llenarArrMostrarProductos(productos);
mostrarProductos(arrMostrarProductos);

//Funciones
//Estructura del HTML
function mostrarProductos(arr) {
    //Asigno a la variable "padreProductos" los div cuya clase sea ="padreProductos"
    const padreProductos = document.querySelector('.padreProductos');
    //Recorro el array productos, y para cada objeto:
    for (const producto of arr) {
        //Creo un div llamado "contenedor"
        let contenedor = document.createElement("div");
        //Le agrego la clase (CSS)
        contenedor.classList.add("tarjetaProducto");
        //Defino el innerHTML del elemento con una plantilla de texto
        contenedor.innerHTML = `<div class="tarjetaProducto">
                                <div class="imagenProducto">
                                    <img src="../images/${producto.imagen}.jpg" alt=${producto.nombre}>
                                </div>
                                <div class="descripcionProducto">
                                    <div class="nombreProducto">
                                        <h2 class="descFoto">${producto.nombre}</h2>
                                    </div>
                                    <div class="precioProducto">
                                        <h2 class="descFoto">$${producto.precio}</h2>
                                    </div>
                                </div>
                                <div class="areaBotonProducto">
                                    <button type="button" class="botonProducto" onclick="apretarBoton()">Agregar Producto</button>
                                </div>
                            </div>  `;
        //Anexo a la variable (div con clase productos) la estructura creada (con la clase ya incluida)
        padreProductos.appendChild(contenedor);
    };
}

function llenarArrMostrarProductos(arr) {
    for (let i = 0; i < arr.length; i++) {
        arrMostrarProductos.push(arr[i]);
    }
};

function filtrarNombre(arr, filtro) {
    //Las variables de los input no las reconocen si estan declaradas como globales
    const inputDesde = parseFloat(filtroDesde.value) || 1;
    const inputHasta = parseFloat(filtroHasta.value) || 1000000000;
    const filtrado = arr.filter((el) => {
        return el.nombre.includes(filtro) && el.precio >= inputDesde && el.precio <= inputHasta;
    });
    return filtrado;
}

function vaciarArray(arr) {
    arr.splice(0)
};

function vaciarProductos() {
    let productos = document.getElementsByClassName("tarjetaProducto");
    for (let i = 0; i < productos.length; i++) {
        productos[i].remove()
    }
};

function agregarProducto() {
    const nom = txtNombre.value;
    const pre = parseFloat(txtPrecio.value);
    const image = "No Disponible";
    const idNuevo = productos.length + 1;
    productos.push({ id: idNuevo, nombre: nom, precio: pre, imagen: image });
};

function guardarLocal() {
    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
    //Almacenar producto por producto
    for (const producto of productos) {
        guardarLocal(producto.id, JSON.stringify(producto));
    }
    // o almacenar array completo
    guardarLocal("listaProductos", JSON.stringify(productos));
};

function recuperarLocal() {
    //Vacio el array "arrMostrarProductos"
    vaciarArray(arrMostrarProductos)
    //Obtengo el listado de productos almacenado en JSON ya transformado en objetos
    const almacenados = JSON.parse(localStorage.getItem("listaProductos"));
    //lleno el ArrMostrarProductos con el array almacenado
    llenarArrMostrarProductos(almacenados);
    vaciarProductos();
    mostrarProductos(arrMostrarProductos);
};

//Eventos
btnFiltrar.addEventListener("click", () => {
    const filtradoNombre = filtrarNombre(arrMostrarProductos, filtroNombre.value);
    vaciarProductos();
    vaciarArray(arrMostrarProductos);
    llenarArrMostrarProductos(filtradoNombre);
    mostrarProductos(arrMostrarProductos);
});

btnAgregar.addEventListener("click", () => {
    vaciarProductos();
    agregarProducto();
    vaciarArray(arrMostrarProductos);
    llenarArrMostrarProductos(productos);
    mostrarProductos(arrMostrarProductos);
});

btnGuardarLocal.addEventListener("click", () => {
    guardarLocal();
});

btnRecuperarLocal.addEventListener("click", () => {
    recuperarLocal();
});