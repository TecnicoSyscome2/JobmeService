/*!
* Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

var _url = "http://localhost:9010/"

function ActualizarPagina(url) {
  var pagina = _url + url;
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