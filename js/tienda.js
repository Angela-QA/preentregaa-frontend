//copia segun IA antes de los camios fatales
let carrito = JSON.parse(localStorage.getItem('carritoAlquilar')) || [];
const contenedorTarjetas = document.querySelector('.productos-seccion');
const listacarrito = document.querySelector('.carrito__lista');
const contadorcarrito = document.querySelector('.tienda__carrito-contador');
const botoncarrito = document.querySelector('.tienda__carrito-btn');
const seccioncarrito = document.querySelector('.carrito-seccion');

// Función asincrónica para el arranque de la tienda
async function iniciarTienda() {
    const respuesta = await fetch('js/productos.json');
    const catalogoAventura = await respuesta.json();
    catalogoAventura.forEach((producto) => {
        contenedorTarjetas.innerHTML += `
        <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto__imagen">
            <h3 class="producto__nombre">${producto.nombre}</h3>
            <p class="producto__precio">Precio: $${producto.precio}</p>
            <button class="producto__boton" data-id="${producto.id}">Alquilar</button>
        </div>
        `; 
    });
    contenedorTarjetas.addEventListener("click", (e) => {
        if (e.target.classList.contains('producto__boton')) {
            const idSeleccionado = e.target.getAttribute('data-id');
            const productoEncontrado = catalogoAventura.find((prod) => prod.id == idSeleccionado);
            const existe = carrito.find((prod) => prod.id == idSeleccionado);
            if (existe) {
                if (existe.cantidad < existe.stock) {
                    existe.cantidad++;
                } else {
                    alert("No hay más stock disponible de este producto");
                }
            } else {
                carrito.push({ ...productoEncontrado, cantidad: 1 });
            }
            actualizarPantallaCarrito();
        }
    });
}

function actualizarPantallaCarrito() {
    listacarrito.innerHTML = '';
    carrito.forEach((prod) => {
        listacarrito.innerHTML += ` 
        <div class="carrito__item">
            <img src="${prod.imagen}" alt="${prod.nombre}" class="carrito__item-miniatura" width="70">
            <span class="carrito__item-nombre">
                ${prod.nombre}
            </span>
            <span class="carrito__item-precio">
                $${prod.precio}
            </span>
            <div class="carrito__item-cantidades">
                <button class="carrito__btn-menos" data-id="${prod.id}">
                    -
                </button>
                <span class="carrito__item-cantidad">
                    ${prod.cantidad}
                </span>
                <button class="carrito__btn-mas" data-id="${prod.id}">
                    +
                </button>
            </div>
        </div>
        `;
    });
    calcularTotal();
    actualizarBurbuja();
    localStorage.setItem('carritoAlquilar', JSON.stringify(carrito));
}

let carritoEscondido = true;
botoncarrito.addEventListener('click', () => {
    seccioncarrito.style.display = carritoEscondido ? 'block' : 'none';
    carritoEscondido = !carritoEscondido;
    actualizarPantallaCarrito();
});

function calcularTotal() {
    console.log("productos en carrito ", carrito);
    let sumaTotal = 0;
    carrito.forEach((prod) => sumaTotal += (prod.precio * prod.cantidad));
    // Inyectar en pantalla
    const elementoTotal = document.querySelector('#carrito_total-valor');
    if (elementoTotal) {
        elementoTotal.innerHTML = sumaTotal;
    }
}

function actualizarBurbuja() {
    contadorcarrito.innerText = carrito.length;
    if (carrito.length > 0) {
        contadorcarrito.style.display = 'block';
    } else {
        contadorcarrito.style.display = 'none';
    }
}

// ABRE EL MODAL 2)
seccioncarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('carrito__btn-pagar')) {
        if (carrito.length === 0) {
            alert("Tu pedido de alquiler esta vacio. Agrega productos antes de cliclear pagar.");
            return;
        }
        // Calculamos el total desde memoria
        let totalNumero = 0;
        carrito.forEach((prod) => totalNumero += (prod.precio * prod.cantidad));
        
        // Inyectamos el total bruto al título del modal
        document.getElementById('modal-total-valor').innerText = totalNumero;
        
        // Dejamos calculadas todas las opciones fijas de cuotas en el desplegable
        document.querySelector('.cuota-val-1').innerText = totalNumero;
        document.querySelector('.cuota-val-3').innerText = (totalNumero / 3).toFixed(0);
        document.querySelector('.cuota-val-6').innerText = (totalNumero / 6).toFixed(0);
        document.querySelector('.cuota-val-9').innerText = (totalNumero / 9).toFixed(0);
        document.querySelector('.cuota-val-12').innerText = (totalNumero / 12).toFixed(0);
        
        // Mostramos la hoja de pago pasando de 'none' a 'flex'
        document.getElementById('modal-pago').style.display = 'flex';
        seccioncarrito.style.display = 'none';
        actualizarPantallaCarrito();
    }   
});

// SÓLO MUESTRA / ESCONDE EL MENÚ)
const selectTarjeta = document.getElementById('tipo-tarjeta');
const grupoCuotas = document.getElementById('grupo-cuotas');

selectTarjeta.addEventListener('change', () => {
    if (selectTarjeta.value === 'credito') {
        grupoCuotas.style.display = 'block';
    }
        else {
             grupoCuotas.style.display = 'none';
        }
});

// DETECTOR DE BOTONES MÁS / MENOS EN CARRITO
listacarrito.addEventListener('click', (e) => {
    const idTexto = e.target.getAttribute('data-id');
    if (!idTexto) return;
    const idNumero = Number(idTexto);
    
    if (e.target.classList.contains('carrito__btn-mas')) {
        const productoEncontrado = carrito.find((prod) => prod.id === idNumero);
        if (productoEncontrado.cantidad < productoEncontrado.stock) {
            productoEncontrado.cantidad++;
        } else {
            alert("No hay más stock disponible de este producto");
        }   
    }
    if (e.target.classList.contains('carrito__btn-menos')) {
        const prod = carrito.find((p) => p.id === idNumero);
        if (prod && prod.cantidad > 1) {
            prod.cantidad--;
        } else {
            carrito = carrito.filter((p) => p.id !== idNumero);
        }
    } 
    actualizarPantallaCarrito(); 
    localStorage.setItem('carritoAlquilar', JSON.stringify(carrito)); 
});
//prueba y mas pruebas
document.getElementById('cuotas').addEventListener('change', (e) => {
    // Capturo resultado y lo casteo a entero
    const dameDato = Number(document.getElementById('carrito_total-valor').innerText);
     // lo divido por el numero que ingreso el usuario
    document.getElementById('modal-cuota-valor').innerText = (dameDato / Number(e.target.value)).toFixed(0);
});
// Efecto sobre tarjetas segun tipo
document.getElementById('nro-tarjeta').addEventListener('input', (e) => {
    // 1. Capturo el primer númro de la tarjeta
    const textoTarjeta = e.target.value;
    // 2. Apunto con puntros sobre los iconos
    const logoVisa = document.querySelector('.fa-cc-visa');
    const logoMaster = document.querySelector('.fa-cc-mastercard');
    
    // 3. El IF de tres caminos basado en el índice cero (como un array de C)
    if (textoTarjeta.startsWith('4')) {
        // Si empieza con 4: Ilumina Visa, apaga Master
        logoVisa.classList.add('tarjeta-activa');
        logoVisa.classList.remove('tarjeta-desactiva');
        
        logoMaster.classList.add('tarjeta-desactiva');
        logoMaster.classList.remove('tarjeta-activa');
    } 
    else if (textoTarjeta.startsWith('5')) {
        // Si empieza con 5: Ilumina Master, apaga Visa
        logoMaster.classList.add('tarjeta-activa');
        logoVisa.classList.remove('tarjeta-desactiva');

        logoVisa.classList.add('tarjeta-desactiva');
        logoVisa.classList.remove('tarjeta-activa');
    } 
    else {
        // EL RETORNO: Si borró todo o puso otro número, vuelven al estado neutro original
        logoVisa.classList.remove('tarjeta-activa', 'tarjeta-desactiva');
        logoMaster.classList.remove('tarjeta-activa', 'tarjeta-desactiva');
    }
});
// EL BOTÓN FINAL 
document.getElementById('btn-pagar-simulacion').addEventListener('click', (e) => {
    e.preventDefault();
    const boton = e.target;
    
    // Evitamos el doble clic
    if (boton.classList.contains('cargando')) return;
    boton.classList.add('cargando');
    
    // Creamos el div en memoria y le clavamos tu clase del CSS externo
    const resaltador = document.createElement('div');
    resaltador.classList.add('efecto-resaltador');
    
    // Aseguramos el orden visual y lo enchufamos adentro del botón
    boton.style.zIndex = '2'; // Esto queda acá solo para que el texto no se tape
    boton.appendChild(resaltador);
    
    // El bucle de tiempo estructurado de C
    let progreso = 0;
    const relojDeCarga = setInterval(() => {
        progreso += 1;
        
        // La única línea que varía el ancho de forma lineal
        resaltador.style.width = progreso + '%';
        
        if (progreso >= 100) {
            clearInterval(relojDeCarga);
            
            // Finiquitamos la simulación secuencial
            alert("¡Pago con éxito! Gracias por confiar en nosotros.");
            
            // Limpieza de memoria y pantallas de la Pupi
            resaltador.remove();
            boton.classList.remove('cargando');
            
            carrito = [];
            localStorage.removeItem('carritoAlquilar');
            actualizarPantallaCarrito();
            
            document.getElementById('modal-pago').style.display = 'none';
            seccioncarrito.style.display = 'none';
        }
    }, 20);
});
// EL BOTÓN DE ESCAPE: Si se arrepiente, cierra el formulario y vuelve a la tienda
document.getElementById('btn-cerrar-modal').addEventListener('click', () => {
    // Escondemos el formulario de pago pasándolo a 'none'
    document.getElementById('modal-pago').style.display = 'none';
});


// Inicialización oficial de la app
iniciarTienda();  