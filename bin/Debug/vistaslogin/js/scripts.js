//var _url = "http://localhost:9010/"
var _url = "http://192.168.1.35:9010/"

function ActualizarPagina(url2) {
    var _pagina = _url + url2;
    fetch(_pagina)
    .then(response => response.text())
    .then(data => {
      document.getElementById("pageview").innerHTML = data;
      OcultarSubMenu();
    })
    .catch(error => console.error('Error:', error));
  
  }
  function guardarcandidatos() {
    var datos = [];
    var elementos = document.querySelectorAll('.dato');
    elementos.forEach(function(elemento) {
        var key = elemento.id; // Usar el id del elemento como key
        var value = elemento.value; // Obtener el valor del elemento
        datos.push({
            campo: key,
            valor: value
        });
    });
    var datosString = JSON.stringify(datos, null, 2);
    var _url = _url; // Reemplaza esto con tu URL
    var url = `${_url}?q=agregar_sin&datos=${encodeURIComponent(datosString)}`;
    fetch(url)
        .then(response => response.text())
        .then(data => {
           alert(data) 
           uploadImage()// Actualizar el contenido del elemento con id "resultado"
           window.location.href = 'logincandidatos';
        })
        .catch(error => console.error('Error:', error));
    return datosString;
}
function guardarempleadores() {
    var datos = [];
    var elementos = document.querySelectorAll('.dato');
    elementos.forEach(function(elemento) {
        var key = elemento.id; // Usar el id del elemento como key
        var value = elemento.value; // Obtener el valor del elemento
        datos.push({
            campo: key,
            valor: value
        });
    });
    var datosString = JSON.stringify(datos, null, 2);
    var _url = _url; // Reemplaza esto con tu URL
    var url = `${_url}?q=agregar_sin_empleador&datos=${encodeURIComponent(datosString)}`;
    fetch(url)
        .then(response => response.text())
        .then(data => {
           alert(data) 
           uploadImageempl()// Actualizar el contenido del elemento con id "resultado"
           window.location.href = 'logincandidatos';
        })
        .catch(error => console.error('Error:', error));
    return datosString;
}
async function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const usuario = document.getElementById('usuario').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const url = _url; // Asegúrate de que _url2 esté definida correctamente
    if (!file) {
      document.getElementById('responseMessage').innerText = 'Please select a file first.';
      return;
    }
    try {
      // Convertir el archivo a base64
      const base64String = await convertToBase64(file);
  
      const data = {
        q: 'guardarCV',
        cv: base64String,
        user: usuario,
        nombre: nombre,
        apellido: apellido
      };

      console.log("Datos enviados:", JSON.stringify(data)); // Verifica el contenido de 'data'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const text = await response.text();
        document.getElementById('responseMessage').innerText = text;
      } else {
        const errorText = await response.text();
        console.error('Error de respuesta:', errorText);
        document.getElementById('responseMessage').innerText = 'Failed to upload image.';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      document.getElementById('responseMessage').innerText = 'Error uploading image.';
    }
  }
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  async function uploadImageempl() {
    const fileInput = document.getElementById('fileInputempl');
    const file = fileInput.files[0];
    const nombre = document.getElementById('nombre').value;
    const url = _url; // Asegúrate de que _url2 esté definida correctamente
  
    if (!file) {
      document.getElementById('responseMessage').innerText = 'Please select a file first.';
      return;
    }
    try {
      const base64String = await convertToBase64empl(file);
      const data = {
        q: 'guardarImagenesempleador',
        logo: base64String,
        nombre: nombre,   
      };
      console.log("Datos enviados:", JSON.stringify(data)); // Verifica el contenido de 'data'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const text = await response.text();
        document.getElementById('responseMessage').innerText = text;
      } else {
        const errorText = await response.text();
        console.error('Error de respuesta:', errorText);
        document.getElementById('responseMessage').innerText = 'Failed to upload image.';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      document.getElementById('responseMessage').innerText = 'Error uploading image.';
    }
  }
  function convertToBase64empl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  function setCurrentDate() {
    const dateInput = document.getElementById("fech_nacim");
    const today = new Date();
    
    // Formatear la fecha en YYYY-MM-DD
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.value = formattedDate;
}
window.onload = setCurrentDate;

function login() {
  var user = document.getElementById('usuario').value;
  var contra = document.getElementById('contraseña').value;
  // Realizamos la solicitud GET al servidor con los datos de usuario y contraseña
  fetch(_url + "?username=" + encodeURIComponent(user) + "&password=" + encodeURIComponent(contra))
    .then(response => response.text())
    .then(data => {
      // Si el login es exitoso, redireccionamos a la página principal
      if (data !== "Upss, la sesión ha expirado.") {
        window.location.href = '/';
      } else {
        // En caso de sesión expirada o cualquier otro mensaje de error, solo mostramos la alerta
        console.log('Error en el login: ');
      }
    })
    .catch(() => {
      alert('Error en la solicitud al servidor.');
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