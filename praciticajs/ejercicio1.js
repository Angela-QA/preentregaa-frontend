let num1= parseInt(prompt("Ingrese el primer número: "));
let num2= parseInt(prompt("Ingrese el segundo número: "));
let num3=11

if(isNaN(num1)==true|| isNaN(num2)==true){
    console.log("Error lo ingresado no es un número. Por favor intente de nuevo");
}
    else{
        console.log("La suma es: ",num1+num2);
        console.log("La resta es: ",num1-num2);
        console.log(" El producto es:",num1*num2); 
        console.log("El modulo (resto) es: ",num1%num2);
        if(num2!=0){
             console.log("La division es: ",num1/num2);
        }
        if(num1+num2>num3){
            console.log("La suma de los numeros: ",num1+num2, "es mayor que el tercer numero: ",num3);
        }
    }
