contenedorTarjetas.addEventListener("click",(e)=>{
    if(e.target.classList.contains('producto__boton')){
        const idSeleccionado= e.target.getAttribute('data-id');
        const productoEncontrado= catalogoAventura.find((prod)=> prod.id==idSeleccionado);
        const existe= carrito.find((prod) => prod.id == idSeleccionado);
        if(existe){
            existe.cantidad++;
        }
            else{
                productoEncontrado.cantidad= 1;
                carrito.push(productoEncontrado);
            }
        actualizarPantallaCarrito();
    }
});