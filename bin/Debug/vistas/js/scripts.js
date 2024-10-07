/*!
* Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project



function ActualizarPagina(url) {
  var pagina = "http://localhost:9010/" + url;
  //var pagina = _url + "obtenerpreguntassolicitud&codigo=0000001";
  //var pagina = _url + "obtenerpreguntassolicitud";

  fetch(pagina)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("contenido").innerHTML = data;
      OcultarSubMenu();
    })
    .catch(error => {
      console.error('Error al actualizar la página:', error);
    });
}

  function logout() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:9010/' + '?q=logout', true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          alert('Has cerrado sesion exitosamente!');
          window.location.href = '/'; // Redirigir a la página de login
        } else {
          alert('Error al cerrar sesion. Por favor intentelo de nuevo.');
        }
      }
    };

    // Enviar la solicitud de logout
    xhr.send();
  }
  function setCurrentDate() {
    const dateInput = document.getElementById("fech_nacim");
    const today = new Date();
    
    // Formatear la fecha en YYYY-MM-DD
    const formattedDate = today.toISOString().split('T')[0];
    
    // Establecer el valor del input
    dateInput.value = formattedDate;
}

// Llamar a la función cuando la página se haya cargado
window.onload = setCurrentDate;

function validarFormulario() {
    var salario = document.getElementById('salario').value;
    if (salario <= 0) {
        alert("El salario debe ser un número positivo.");
        return false;
    }
    return true;
}
