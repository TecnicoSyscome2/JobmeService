
var _url = "http://localhost:9010/?verif=scm64&q=";
function guardarofertas() {
    var datos = [];

    // Obtener todos los elementos con la clase "oferta"
    var elementos = document.querySelectorAll('.oferta');
    elementos.forEach(function(elemento) {
        var key = elemento.id; // Usar el id del elemento como key
        var value = elemento.value; // Obtener el valor del elemento
        datos.push({
            campo: key,
            valor: value
        });
    });

    // Convertir el array de objetos en un string JSON
    var datosString = JSON.stringify(datos);

    // Hacer la solicitud POST
    fetch(_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: datosString
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        alert(data);  // Mostrar respuesta en un alerta
    })
    .catch(error => console.error('Error:', error));

    return datosString;  // Para depuración
}


