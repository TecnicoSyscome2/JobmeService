function login() {
    var user = document.getElementById('usuario').value;
    var contra = document.getElementById('contraseña').value;
    var url = "http://localhost:9010/";
        //var url = "http://161.97.77.167:9000/";
        //url = "http://192.168.1.12:5008/";
  
    // Realizamos la solicitud GET al servidor con los datos de usuario y contraseña
    fetch(url + "?username=" + encodeURIComponent(user) + "&password=" + encodeURIComponent(contra))
      .then(response => response.text())
      .then(data => {
        // Mostramos la respuesta en una alerta
        alert(data);
        
        // Si el login es exitoso, redireccionamos a la página principal
        if (data !== "Upss, la sesión ha expirado.") {
          window.location.href = '/';
        } else {
          // En caso de sesión expirada o cualquier otro mensaje de error, solo mostramos la alerta
          console.log('Error en el login: ' + data);
        }
      })
      .catch(() => {
        alert('Error en la solicitud al servidor.');
      });
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
  