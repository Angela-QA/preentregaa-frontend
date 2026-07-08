let carrito= [];

const contenedorTarjetas= document.querySelector('.productos-seccion');
const listacarrito= document.querySelector('.carrito__lista');
const totalcarrito= document.querySelector('#carrito_total-valor');

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
        <p class="carrito__item">
            ${prod.nombre} - $${prod.precio}
        </p>
        
        `;
    });
    let sumaTotal=0;
    carrito.forEach((prod)=> sumaTotal += prod.precio);
    totalcarrito.innerHTML+= sumaTotal; 
    console.log("contenido del carrito",carrito);
    console.log("la suma total es: ",sumaTotal);
}



