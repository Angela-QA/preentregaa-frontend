let carrito= [];

const contenedorTarjetas= document.querySelector('.productos-seccion');
const listacarrito= document.querySelector('.carrito__lista');
const totalcarrito= document.querySelector('#carrito_total-valor');
const contadorcarrito= document.querySelector('.tienda__carrito-contador');


const botoncarrito= document.querySelector('.tienda__carrito-btn');
const seccioncarrito= document.querySelector('.carrito-seccion');


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
        carrito.push(productoEncontrado);
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
                    1
                </span>
                <button class= "carrito__btn-mas" data-id= "${prod.id}">
                    +
                </button>
            </div>
            
        </div>
        
        `;
    });
    let sumaTotal=0;
    carrito.forEach((prod)=> sumaTotal += prod.precio);
    totalcarrito.innerHTML= sumaTotal; 
    contadorcarrito.innerText= carrito.length;
    if(carrito.length>0){
        contadorcarrito.style.display='block';
    } 
        else{
            contadorcarrito.style.display= 'none';
        }
}
botoncarrito.addEventListener('click', () =>{
    seccioncarrito.style.display= 'block';
});



        

/*function actualizarPantallaCarrito(){
    listacarrito.innerHTML='';
    carrito.forEach((prod)=>{
        listacarrito.innerHTML+=`
        <p class="carrito__item">
            ${prod.nombre} - $${prod.precio}
        </p>
        
        `;
    });
    let sumaTotal=0;
    carrito.forEach((prod)=> sumaTotal += prod.precio);
    totalcarrito.innerHTML= sumaTotal; 
}*/

