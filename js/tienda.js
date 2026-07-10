let carrito= [];

const contenedorTarjetas= document.querySelector('.productos-seccion');
const listacarrito= document.querySelector('.carrito__lista');
//const totalcarrito= document.querySelector('#carrito_total-valor');
const contadorcarrito= document.querySelector('.tienda__carrito-contador');
const botoncarrito= document.querySelector('.tienda__carrito-btn');
const seccioncarrito= document.querySelector('.carrito-seccion');

//const botonpagar= document.querySelector('carrito__btn-pagar');

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
            existe.cantidad++;
        }
            else{
                carrito.push({...productoEncontrado, cantidad: 1});
               // productoEncontrado.cantidad= 1;
                //carrito.push(productoEncontrado);
            }
        actualizarPantallaCarrito();
    }
});
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
//lista carrito empieza linea 90
listacarrito.addEventListener('click', (e) => {
    console.log("click detectado");
    console.log(e.target);
    console.log(e.target.className);


    const idTexto= e.target.getAttribute('data-id');
    if(!idTexto) return;
    const idNumero= Number(idTexto);
    
    if(e.target.classList.contains('carrito__btn-mas')){
        carrito.find((prod) => prod.id === idNumero).cantidad++;;
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
});
seccioncarrito.addEventListener('click', (e) =>{
    if(e.target.classList.contains('carrito__btn-pagar')){
        alert("Pago Exitoso. Gracias por confiar en nosotros.");
        carrito= [];
        actualizarPantallaCarrito();
    }
    
});
