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
    txtPrecio = document.querySelector("#agregarPrecio"),
    padreProductos = document.querySelector('.padreProductos'),
    contenedor = document.querySelector("#losProductos");
let productos, arrMostrarProductos = [];


//Clase producto con su respectivo constructor
class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.imagen = imagen;
    }
}


//Load de la pagina
cargarConFetch();


//Funciones
function vaciarContenedor() {
    contenedor.innerHTML = "";
};

function cargarConFetch() {
    fetch('../data.json')
        .then((res) => res.json())
        .then((data) => {
            productos = data;
            data.forEach((producto) => {
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
                            </div>  `;
                padreProductos.append(contenedor)
            })
        })
}

function llenarArr(arr, arrAllenar) {
    for (let i = 0; i < arr.length; i++) {
        arrAllenar.push(arr[i]);
    }
};

function mostrarProductos(arr) {
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
                            </div>  `;
        //Anexo a la variable (div con clase productos) la estructura creada (con la clase ya incluida)
        padreProductos.appendChild(contenedor);
    };
}

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

function agregarProducto() {
    const nom = txtNombre.value;
    const pre = parseFloat(txtPrecio.value);
    const image = "No Disponible";
    const idNuevo = productos.length + 1;
    productos.push({ id: idNuevo, nombre: nom, precio: pre, imagen: image });
};

function toast(Mensaje) {
    Toastify({
        text: Mensaje,
        duration: 2000,
        close: true,
        gravity: "botom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
};


//Eventos
btnFiltrar.addEventListener("click", () => {
    vaciarContenedor();
    vaciarArray(arrMostrarProductos);
    llenarArr(productos, arrMostrarProductos);
    const filtradoNombre = filtrarNombre(arrMostrarProductos, filtroNombre.value);
    vaciarArray(arrMostrarProductos);
    llenarArr(filtradoNombre, arrMostrarProductos);
    mostrarProductos(arrMostrarProductos);
    vaciarArray(arrMostrarProductos);
});

btnAgregar.addEventListener("click", () => {
    vaciarContenedor();
    agregarProducto();
    vaciarArray(arrMostrarProductos);
    llenarArr(productos, arrMostrarProductos);
    mostrarProductos(arrMostrarProductos);
    document.querySelector("#agregarNombre").value = "";
    document.querySelector("#agregarPrecio").value = "";
    toast("Agregado Correctamente");
});

btnGuardarLocal.addEventListener("click", () => {
    Swal.fire({
        title: "Acción no reversible",
        text: "¿Está seguro de querer guardar los productos actuales en almacenamiento local? Se sobrescribiran los datos guardados actualmente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
        const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
        //Almacenar producto por producto
        for (const producto of productos) {
            guardarLocal(producto.id, JSON.stringify(producto));
        }
        // o almacenar array completo
        guardarLocal("listaProductos", JSON.stringify(productos));
        Swal.fire("Exito!", "Los productos se han guardado.", "success");
    }
    });
});

btnRecuperarLocal.addEventListener("click", () => {
    Swal.fire({
        title: "Acción no reversible",
        text: "¿Está seguro de querer recuperar los productos almacenados en almacenamiento local? Se perderán los datos no guardados",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarContenedor();
            //Vacio el array "arrMostrarProductos"
            vaciarArray(arrMostrarProductos)
            vaciarArray(productos)
            //Obtengo el listado de productos almacenado en JSON ya transformado en objetos
            const almacenados = JSON.parse(localStorage.getItem("listaProductos"));
            //lleno los Array locales con el array almacenado
            llenarArr(almacenados, productos)
            llenarArr(almacenados, arrMostrarProductos);
            mostrarProductos(arrMostrarProductos);
            Swal.fire("Exito!", "Los productos se han recuperado.", "success");
        }
    });
});