let nombre="Gabriela";
let correo= "ejemplo@algo.com";
let mensaje="";
function validar_datos(nombre, correo, mensaje){
    if(nombre!="" && correo!="" && mensaje!=""){
        console.log("El formaulario esta completo");
    }
        else{
            console.log("El fomulario esta incompleto.");
        }
}
validar_datos(nombre,correo,mensaje);