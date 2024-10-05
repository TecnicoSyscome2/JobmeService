/*!
* Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

var _url = "http://localhost:9010/"

function ActualizarPagina(url) {


    var _pagina = _url + url;
    //var _pagina = _url + "obtenerpreguntassolicitud&codigo=0000001"
    //var _pagina = _url + "obtenerpreguntassolicitud";
 
    fetch(_pagina)
    .then(response => response.text())
    .then(data => {
      document.getElementById("pageview").innerHTML = data;
      OcultarSubMenu();
    })
    .catch(error => console.error('Error:', error));
  
  }

  function logout() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', _url + '?logout', true);

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

  llenarpais()
  function llenarpais() {

    var _pagina = _url + "/?q=llenadopais";

    fetch(_pagina)
    .then(response => response.text())
    .then(data => {
      document.getElementById("pais").innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
  }
  llenardep()
  function llenardep() {

    var _pagina = _url + "/?q=llenadodep";

    fetch(_pagina)
    .then(response => response.text())
    .then(data => {
      document.getElementById("departamento").innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
  }
  llenardis()
  function llenardis() {

    var _pagina = _url + "/?q=llenadodis";

    fetch(_pagina)
    .then(response => response.text())
    .then(data => {
      document.getElementById("municipio").innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
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