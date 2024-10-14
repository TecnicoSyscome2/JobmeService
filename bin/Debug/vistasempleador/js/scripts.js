


var _url = "http://localhost:9010/?";
function ActualizarPagina(url2) {
  var _pagina = _url + url2;
  fetch(_pagina)
  .then(response => response.text())
  .then(data => {
    document.getElementById("contenido").innerHTML = data;
    if(url2="form_empleadoresinterno"){
      cargarFormularioofertasempleo()
     
    }

  })
  .catch(error => console.error('Error:', error));
}

  function logout() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', _url + 'q=logout', true);

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

function guardaroferta() {
  var _tabla = document.getElementById("tabla").value;
  var datos = [];
  // Recoger los datos de la oferta de empleo
  var elementos = document.getElementsByClassName("dato");
  for (var i = 0; i < elementos.length; i++) {
    var key = elementos[i].id; // Puedes usar cualquier atributo para el key, como id, name, etc.
    var value = elementos[i].value; // Asume que los elementos son input, textarea o select
    datos.push({
      campo: key,
      valor: limpiar(value)
    });
  }
  // Convertir el array de datos de la oferta en un string JSON
  var datosString = JSON.stringify(datos, null, 2);

  // Recoger los datos de los requisitos (suponiendo que están en una tabla con clase 'detalle')
  var requisitos = [];
var filasRequisitos = document.querySelectorAll('#tblDetalle tbody tr'); // Obtener todas las filas del cuerpo de la tabla

filasRequisitos.forEach(function(fila) {
    var requisito = {};
    var celdas = fila.querySelectorAll('.detalle'); // Iterar sobre cada celda con la clase "detalle"
    
    celdas.forEach(function(celda) {
        var campo = celda.id;
        var value = celda.innerText || celda.value || celda.textContent;
        
        if (value) { // Solo agregar si el valor no está vacío
            requisito[campo] = limpiar(value); // Limpiar el valor antes de guardarlo
        }
    });
    // Solo añadir el objeto si tiene propiedades (es decir, no está vacío)
    if (Object.keys(requisito).length > 0) {
        requisitos.push(requisito);
    }
});
  // Convertir los requisitos en un string JSON
  var requisitosString = JSON.stringify(requisitos, null, 2);



  var ofrecimientos = [];
var filasOfrecimiento = document.querySelectorAll('#tblOfrecimientos tbody tr'); 
  filasOfrecimiento.forEach(function(fila) {
    var ofrecimiento = {};
    var celdas = fila.querySelectorAll('.detalle2'); // Iterar sobre cada celda con la clase "detalle"
    
    celdas.forEach(function(celda) {
        var campo = celda.id;
        var value = celda.innerText || celda.value || celda.textContent;
        
        if (value) { // Solo agregar si el valor no está vacío
            ofrecimiento[campo] = limpiar(value); // Limpiar el valor antes de guardarlo
        }
    });
    // Solo añadir el objeto si tiene propiedades (es decir, no está vacío)
    if (Object.keys(ofrecimiento).length > 0) {
        ofrecimientos.push(ofrecimiento);
    }
});
  // Convertir los requisitos en un string JSON
  var ofrecimientosString = JSON.stringify(ofrecimientos, null, 2);
  // Definir la URL del servidor

  // Crear la solicitud XMLHttpRequest para enviar la oferta y los requisitos
  var xhr = new XMLHttpRequest();
  xhr.open('GET', _url + "q=agregar_oferta&datos=" + encodeURIComponent(datosString) + "&requisitos=" + encodeURIComponent(requisitosString) + "&ofertaofrecimiento=" + encodeURIComponent(ofrecimientosString) + "&tabla=" + _tabla, true);

  // Manejar la respuesta del servidor
  xhr.onload = function(data) {
    if (xhr.status === 200) {
      alert('Oferta y requisitos guardados exitosamente');
      // Aquí podrías realizar alguna acción adicional si es necesario
    } else {
      console.error('Error al guardar la oferta: ', xhr.responseText);
      alert('Error al guardar la oferta');
    }
  };
  // Enviar la solicitud
  xhr.send();
  // Devuelve los datos de la oferta como cadena JSON para cualquier verificación o uso adicional
  return datosString;
}

function agregarFila() {

  let esValido = true;
// Obtener los valores de los inputs
var descipcion = document.getElementById("descripcion2").value;

// Validar cada campo
if (descipcion.length < 0) {
  esValido = false;
  alert("Por favor ingrese la descripcion de la actividad.");
}
  // Obtener los valores de los elementos del formulario
if(esValido == true ){
  document.getElementById("descripcion2").value = '';
  var tblDetalle = document.getElementById("tblDetalle").getElementsByTagName('tbody')[0];

  // Crear una nueva fila
  var nuevaFila = tblDetalle.insertRow();

  // Crear las celdas para cada campo
  var celdaEliminar = nuevaFila.insertCell(0);
  var celdarequisitos = nuevaFila.insertCell(1);


  // Agregar contenido a las celdas y asignar id y clase
  celdaEliminar.innerHTML = '<button onclick="modificarFila(this)">Modificar</button>';
  
  celdarequisitos.innerText = descipcion;
  celdarequisitos.id = 'descripcion';
  celdarequisitos.className = 'detalle';}

 
}

function agregarFila2() {

  let esValido = true;
  // Obtener los valores de los inputs
  var descripcion = document.getElementById("descripcion3").value;

  // Validar el campo de descripción
  if (descripcion.trim().length === 0) {
    esValido = false;
    alert("Por favor ingrese la descripción de los ofrecimientos.");
  }
  // Si es válido, insertar la fila
  if (esValido) {
    // Limpiar el campo de descripción
    document.getElementById("descripcion3").value = '';
    // Obtener la tabla de ofrecimientos
    var tblOfrecimientos = document.getElementById("tblOfrecimientos").getElementsByTagName('tbody')[0];
    // Crear una nueva fila
    var nuevaFila = tblOfrecimientos.insertRow();
    // Crear las celdas para cada campo
    var celdaEliminar = nuevaFila.insertCell(0);
    var celdaDescripcion = nuevaFila.insertCell(1);
    // Agregar contenido a las celdas y asignar id y clase
    celdaEliminar.innerHTML = '<button onclick="modificarFila2(this)">Modificar</button>';
    
    celdaDescripcion.innerText = descripcion;
    celdaDescripcion.id = 'descripcion4';
    celdaDescripcion.className = 'detalle2';
  }
}

function modificarFila(boton) {
  // Obtener la fila actual
  var fila = boton.parentNode.parentNode;
  var descripcion = fila.querySelector('#descripcion').innerText;
  document.getElementById('descripcion2').value = limpiar(descripcion);
  fila.parentNode.removeChild(fila);
}

function modificarFila2(boton) {
  // Obtener la fila actual
  var fila = boton.parentNode.parentNode;
  var descripcion = fila.querySelector('#descripcion3').innerText; // Cambiar a 'descripcion3' para la tabla de ofrecimientos
  document.getElementById('descripcion4').value = limpiar(descripcion); // Cambiar a 'descripcion3' para el campo de ofrecimientos
  fila.parentNode.removeChild(fila); // Eliminar la fila actual
}

function setCurrentDate() {
    const dateInput = document.getElementById("desde");
    const today = new Date();
    
    // Formatear la fecha en YYYY-MM-DD
    const formattedDate = today.toISOString().split('T')[0];
    
    // Establecer el valor del input
    dateInput.value = formattedDate;
}
function setCurrentDate2() {
  const dateInput = document.getElementById("hasta");
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
function limpiar(pFrase) {
  pFrase = pFrase.replace(/á/g, '(a)');
  pFrase = pFrase.replace(/é/g, '(e)');
  pFrase = pFrase.replace(/í/g, '(i)');
  pFrase = pFrase.replace(/ó/g, '(o)');
  pFrase = pFrase.replace(/ú/g, '(u)');
  pFrase = pFrase.replace(/ñ/g, '(n)');
  pFrase = pFrase.replace(/Ñ/g, '(N)');
  pFrase = pFrase.replace(/<br>/g, '\n');
  return pFrase;
}

function cargarFormularioofertasempleo() {
  // Código HTML del formulario
  const formularioHTML = `
<div class="row">
  <div class="col-md-8" id="ofertas_empleo">
    <input type="hidden" id="tabla" value="ofertasempleo" />
    <div id="jobForm" class="form-oferta">
      <div class="form-grid">
        <div>
          <label for="titulo">Título de la Oferta</label>
          <input type="text" class="oferta dato" id="titulo" name="titulo" placeholder="Ej. Desarrollador Web" required>
        </div>
        <div>
          <label for="ubicacion">Ubicación</label>
          <input type="text" class="oferta dato" id="ubicacion" name="ubicacion" placeholder="Ej. Ciudad, País" required>
        </div>
        <div>
          <label for="salariodesde">Salario Minimo</label>
          <input type="number" class="oferta dato" id="pagomin" name="salariodesde" placeholder="Ej. 50000" required>
        </div>
        <div>
          <label for="salariohasta">Salario Maximo</label>
          <input type="number" class="oferta dato" id="pagomax" name="salariohasta" placeholder="Ej. 50000" required>
        </div>

        <div>
          <label for="tipoContrato">Tipo de Contrato</label>
          <select id="contrato" class="oferta dato" name="tipoContrato" required></select>
        </div>
        <div>
          <label for="plazas"># Plazas</label>
          <input type="number" class="oferta dato" id="plazas" name="plazas" placeholder="Ej. 1" required>
        </div>
        <div>
          <label for="desde">Periodo de Disponibilidad Desde</label>
          <input type="date" class="oferta dato" id="desde" name="desde" required>
        </div>
        <div>
          <label for="hasta">Periodo de Disponibilidad Hasta</label>
          <input type="date" class="oferta dato" id="hasta" name="hasta" required>
        </div>
        <div class="full-width">
          <label for="epiccalling">Epic Calling</label>
          <textarea id="epiccalling" class="oferta dato" name="epiccalling" placeholder="Escriba un texto que inspire a sus solicitantes..." rows="4" required></textarea>
        </div>
      </div>
      <button type="button" onclick="guardaroferta(); validarFormulario()">Agregar Oferta</button>
    </div>
  </div>
  <div class="col-md-4">
    <div id="ofertas_empleorequisitos">
      <input type="hidden" id="tabla" value="ofertasempleo" />
      <div id="jobForm" class="form-oferta">
              <div>
          <label for="tipoContrato">Nivel Educativo</label>
          <select id="niveleduc" class="oferta dato" name="tipoContrato" required></select>
        </div>
         <div class="form-grid">
        <div>
          <label for="edadmin">Edad Minima</label>
          <input type="number" class="oferta dato" id="edadmin" name="edadmin" required>
        </div>
        <div>
          <label for="edadmax">Edad Maxima</label>
          <input type="number" class="oferta dato" id="edadmax" name="edadmax" required>
        </div>
        </div>
        <div class="full-width">
          <label for="descripcion2">Requisitos</label>
          <textarea id="descripcion2" class="oferta " name="descripcion2" placeholder="Escriba los requisitos de su solicitud..." rows="4" required></textarea>
        </div>
        <button type="button" onclick="agregarFila()">Agregar</button>
        <div class="full-width">
          <div class="table-container">
            <table id="tblDetalle" class="table table-sm">
              <thead>
                <tr>
                  <th>*</th>
                  <th><b>Descripción</b></th>
                </tr>
              </thead>
              <tbody id="tblrequisitosbody">
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div id="ofertas_empleofrecimiento" style="margin-top: 20px;">
      <input type="hidden" id="tabla" value="ofertasempleo" />
      <div id="jobForm" class="form-oferta">
        <div class="full-width">
          <label for="descripcion2">Prestaciones</label>
          <textarea id="descripcion3" class="oferta " name="descripcion3" placeholder="Escriba los ofrecimientos de su solicitud..." rows="4" required></textarea>
        </div>
        <button type="button" onclick="agregarFila2()" >Agregar</button>
        <div class="full-width">
          <div class="table-container">
            <table id="tblOfrecimientos" class="table table-sm">
              <thead>
                <tr>
                  <th>*</th>
                  <th><b>Descripción</b></th>
                </tr>
              </thead>
              <tbody id="tblOfrecimientosBody">
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;   
  // Insertar el formulario en el div con id 'contenido'
  document.getElementById("contenido").innerHTML = formularioHTML;
  // Llama a la función después de que el formulario haya sido cargado
  llenartipocontrato();
  llenarniveleducativo()
  setCurrentDate();
  setCurrentDate2();
}
cargarFormularioofertasempleo()
function llenartipocontrato() {
  var _pagina = _url + "q=listacontratos";
  fetch(_pagina)
  .then(response => response.text())
  .then(data => {
  document.getElementById("contrato").innerHTML = data;
  })
  .catch(error => console.error('Error:', error));
  }
  function llenarniveleducativo() {
    var _pagina = _url + "q=listaniveleducativo";
    fetch(_pagina)
    .then(response => response.text())
    .then(data => {
    document.getElementById("niveleduc").innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
  }