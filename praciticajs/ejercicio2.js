/* Concatenación y conversión de tipos de datos*/

let nombre= prompt("Ingrese su nombre: ");
let edad= prompt("Ingrese su edad: ");
console.log("Su nombre es "+nombre +" y tienes "+ edad + " años");
if(isNaN(edad)==false){
    edad= Number(edad);
    if(edad>=18){
        console.log("ES mayor de edad");
    }
        else{
            console.log("No es mayor de edad");
        }
}