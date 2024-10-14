
var _url2 = "http://localhost:9010/"
function guardarcandidatos() {
   

    var datos = [];

    // Obtener todos los elementos con la clase "dato"
    var elementos = document.querySelectorAll('.dato');
    elementos.forEach(function(elemento) {
        var key = elemento.id; // Usar el id del elemento como key
        var value = elemento.value; // Obtener el valor del elemento
        datos.push({
            campo: key,
            valor: value
        });
    });

    // Convertir el array de objetos en un string JSON
    var datosString = JSON.stringify(datos, null, 2);

    // Hacer la solicitud GET
    var _url = _url2; // Reemplaza esto con tu URL
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

    // Obtener todos los elementos con la clase "dato"
    var elementos = document.querySelectorAll('.dato');
    elementos.forEach(function(elemento) {
        var key = elemento.id; // Usar el id del elemento como key
        var value = elemento.value; // Obtener el valor del elemento
        datos.push({
            campo: key,
            valor: value
        });
    });

    // Convertir el array de objetos en un string JSON
    var datosString = JSON.stringify(datos, null, 2);

    // Hacer la solicitud GET
    var _url = _url2; // Reemplaza esto con tu URL
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
    const url = _url2; // Asegúrate de que _url2 esté definida correctamente
  
    if (!file) {
      document.getElementById('responseMessage').innerText = 'Please select a file first.';
      return;
    }
  
    try {
      // Convertir el archivo a base64
      const base64String = await convertToBase64(file);
  
      const data = {
        q: 'guardarImagenes',
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
    const url = _url2; // Asegúrate de que _url2 esté definida correctamente
  
    if (!file) {
      document.getElementById('responseMessage').innerText = 'Please select a file first.';
      return;
    }
  
    try {
      // Convertir el archivo a base64
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