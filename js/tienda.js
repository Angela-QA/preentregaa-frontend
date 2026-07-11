let carrito= JSON.parse(localStorage.getItem('carritoAlquilar')) || [] ;
const contenedorTarjetas= document.querySelector('.productos-seccion');
const listacarrito= document.querySelector('.carrito__lista');
const contadorcarrito= document.querySelector('.tienda__carrito-contador');
const botoncarrito= document.querySelector('.tienda__carrito-btn');
const seccioncarrito= document.querySelector('.carrito-seccion');

//funcion asincronica para el arranque
async function iniciarTienda() {
    const respuesta= await fetch('js/productos.json');
    const catalogoAventura= await respuesta.json();
    catalogoAventura.forEach((producto)=>{
    contenedorTarjetas.innerHTML +=`
    <div class= "producto">
        <img src="${producto.imagen}" alt="${producto.nombre}" class= "producto__imagen">
        <h3 class= "producto__nombre">${producto.nombre}</h3>
        <p class= "producto__precio">Precio: $${producto.precio}</p>
        <button class= "producto__boton" data-id="${producto.id}">Alquilar</button>
        </div>
    `; 
});
    contenedorTarjetas.addEventListener("click",(e)=>{
    if(e.target.classList.contains('producto__boton')){
        const idSeleccionado= e.target.getAttribute('data-id');
        const productoEncontrado= catalogoAventura.find((prod)=> prod.id==idSeleccionado);
        const existe= carrito.find((prod) => prod.id == idSeleccionado);
        if(existe){
           if(existe.cantidad < existe.stock){
                existe.cantidad++;
            }
            else{
                alert("No hay más stock disponibe de este producto");
            }
        }else{
                carrito.push({...productoEncontrado, cantidad: 1});
            }
        actualizarPantallaCarrito();
    }
});
    
}

function actualizarPantallaCarrito(){
    listacarrito.innerHTML='';
    carrito.forEach((prod)=>{
        listacarrito.innerHTML+=` 
        <div class= "carrito__item">
            <img src= "${prod.imagen}" alt= "${prod.nombre}" class= "carrito__item-miniatura" width= 70>
            <span class= "carrito__item-nombre">
                ${prod.nombre}
            </span>
            <span class= "carrito__item-precio">
                $${prod.precio}
            </span>
            <div class= "carrito__item-cantidades">
                <button class= "carrito__btn-menos" data-id= "${prod.id}">
                    -
                </button>
                <span class= "carrito__item-cantidad">
                    ${prod.cantidad}
                </span>
                <button class= "carrito__btn-mas" data-id= "${prod.id}">
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
let carritoEscondido= true;
botoncarrito.addEventListener('click', () =>{
    seccioncarrito.style.display= carritoEscondido ? 'block' : 'none';
    carritoEscondido= !carritoEscondido
    actualizarPantallaCarrito();
});
function calcularTotal(){
    console.log("productos en carrito ",carrito);
    let sumaTotal=0;
    carrito.forEach((prod)=> sumaTotal += (prod.precio * prod.cantidad));
    document.querySelector('#carrito_total-valor').innerHTML =sumaTotal;
}
function actualizarBurbuja(){
    contadorcarrito.innerText= carrito.length;
    if(carrito.length>0){
        contadorcarrito.style.display='block';
    } 
        else{
            contadorcarrito.style.display= 'none';
        }
}


seccioncarrito.addEventListener('click', (e) =>{
    if(e.target.classList.contains('carrito__btn-pagar')){
        if(carrito.length === 0){
            alert("Tu pedido de alquiler esta vacio. Agrega productos antes de cliclear pagar.");
            return;
        }
        alert("Pago Exitoso. Gracias por confiar en nosotros.");
        carrito= [];
        actualizarPantallaCarrito();
    }
    
});
listacarrito.addEventListener('click', (e) => {
        const idTexto= e.target.getAttribute('data-id');
        if(!idTexto) return;
        const idNumero= Number(idTexto);
        if(e.target.classList.contains('carrito__btn-mas')){
        const productoEncontrado= carrito.find((prod) => prod.id === idNumero);
        if(productoEncontrado.cantidad < productoEncontrado.stock){
            productoEncontrado.cantidad++;
        }
            else{
                alert("No hay más stock disponibe de este producto");
            }   
    }
    if(e.target.classList.contains('carrito__btn-menos')){
        const prod= carrito.find((p) => p.id === idNumero);
        if (prod && prod.cantidad > 1){
            prod.cantidad--;
        } 
            else {
                carrito = carrito.filter((p) => p.id !== idNumero);
            }
    } 
    actualizarPantallaCarrito(); 
    localStorage.setItem('carritoAlquilar', JSON.stringify(carrito)); 
});
iniciarTienda();
