let carrito= [];

const contenedorTarjetas= document.querySelector('.productos-seccion');

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

    }
});
    
