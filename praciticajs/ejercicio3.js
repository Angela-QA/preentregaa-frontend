let producto1={
    nombre: "harina",
    precio: 1800,
    stock:1000
}
console.log("Nombre: ",producto1.nombre);
console.log("Precio: ",producto1.precio);
let producto2={
        nombre: "manteca",
        precio: 5200,
        stock:100
}
let producto3={
        nombre: "queso",
        precio: 2500,
        stock:100
}
let catalogo=[producto1,producto2,producto3];
console.log("Estructura del catalogo");
console.log(catalogo);
console.log("-----El catalogo-----");
console.log("nombre: ",catalogo[1].nombre," Precio: ", catalogo[1].precio);

