


//var _url = "http://localhost:9010/?";
var _url = "http://192.168.1.35:9010/?"
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
         // alert('Has cerrado sesion exitosamente!');
          window.location.href = '/'; // Redirigir a la página de login
        } else {
          //alert('Error al cerrar sesion. Por favor intentelo de nuevo.');
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
  pFrase = pFrase.replace(/Á/g, '(A)');
  pFrase = pFrase.replace(/É/g, '(E)');
  pFrase = pFrase.replace(/Í/g, '(I)');
  pFrase = pFrase.replace(/Ó/g, '(O)');
  pFrase = pFrase.replace(/Ú/g, '(U)');
  pFrase = pFrase.replace(/<br>/g, '\n');
  return pFrase;
}
function desLimpiar(pDato) {
  pDato = pDato.replace(/\(a\)/g, 'á');
  pDato = pDato.replace(/\(e\)/g, 'é');
  pDato = pDato.replace(/\(i\)/g, 'í');
  pDato = pDato.replace(/\(o\)/g, 'ó');
  pDato = pDato.replace(/\(u\)/g, 'ú');
  pDato = pDato.replace(/\(n\)/g, 'ñ');
  pDato = pDato.replace(/\(N\)/g, 'Ñ');
  pDato = pDato.replace(/\(A\)/g, 'Á'); // Agregado
  pDato = pDato.replace(/\(E\)/g, 'É'); // Agregado
  pDato = pDato.replace(/\(I\)/g, 'Í'); // Agregado
  pDato = pDato.replace(/\(O\)/g, 'Ó'); // Agregado
  pDato = pDato.replace(/\(U\)/g, 'Ú'); // Agregado
  pDato = pDato.replace(/\n/g, '<br>')
  return pDato;
}

function cargarFormularioofertasempleo() {
  // Código HTML del formulario
  const formularioHTML = `
   <div class="row justify-content-center" id="contenido">
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
        <div hidden>
          <label for="desde">Oportunidad Valida Desde</label>
          <input type="date" class="oferta dato" id="desde" name="desde" required>
        </div>
        <div>
          <label for="hasta">Oportunidad valida Hasta</label>
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
  llenarofertas()
  function llenarofertas() {

    var _pagina = _url + "q=listaofertasempleo";
    
    fetch(_pagina)
    .then(response => response.text())
    .then(data => {
      document.getElementById("ofertasitem").innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
    }
   
    function llenarcandidatos(oferta) {
      document.getElementById("candidatositem").innerHTML = "";
      var _pagina = _url + "q=listadecandidatosparaoferta&idoferta=" + oferta;
      
      fetch(_pagina)
      .then(response => response.text())
      .then(data => {
        document.getElementById("candidatositem").innerHTML = data;
      })
      .catch(error => console.error('Error:', error));
      }

      function cargarvistaoferta(empresa) {
        // Código HTML del formulario
        const formularioHTML = `
         <input type="number"  id="idoferta" name="idoferta" value="" hidden>
              <!-- Sección Título -->
              <section class="job-title">
                  <h2 id="titulo">Título de la Oferta</h2>
                  
              </section>
            
            
        <section class="job-details">
           <h3>Detalles del Empleo</h3>
<p style="display: none;"><strong>Nombre de la Empresa: </strong> <span id="nombreempresa"></span></p>
<p style="display: none;"><strong>Ubicación: </strong> <span id="ubicacion"></span></p>
<p style="display: none;"><strong>Salario: </strong> De <span id="pagomin"></span> a <span id="pagomax"></span></p>
<p style="display: none;"><strong>Oportunidad Disponible: </strong> Desde <span id="desde"></span> Hasta <span id="hasta"></span></p>
<p style="display: none;"><strong>Tipo de Contrato:</strong> <span id="nombrecontrato"></span></p>
<p style="display: none;"><strong>Disponibles: </strong> <span id="plazas"></span></p>
<p style="display: none;"><strong>Edad Mínima: </strong> <span id="edadmin"></span></p>
<p style="display: none;"><strong>Edad Máxima: </strong> <span id="edadmax"></span></p>
<p style="display: none;"><strong>Nivel Educativo: </strong> <span id="nombreeduc"></span></p>
        </section>
        
        <!-- Descripción de Epic Calling -->
        <section class="job-epic-calling">
          
            <p id="epicCalling">Descripción del Epic Calling</p>
        </section>

<section class="job-offers" >

</section>
        <a  class="apply-button" onClick="aplicarofertas()">Aplicar Ahora</a>
      <div class="summary" id="ofrecimientos">
          <h4>Resumen del Puesto</h4>
          <p><strong>Título:</strong> <span id="resumen-titulo">Desarrollador Full-Stack Senior</span></p>
          <p><strong>Ubicación:</strong> <span id="resumen-ubicacion">Ciudad de México</span></p>
          <p><strong>Salario:</strong> <span id="resumen-salario">$30,000 - $45,000 MXN</span></p>
          <p><strong>Fechas:</strong> <span id="resumen-fechas">01/10/2024 - 01/10/2025</span></p>
          <p><strong>Plazas:</strong> <span id="resumen-plazas">3</span></p>
      </div>
      
      `;   
        // Insertar el formulario en el div con id 'contenido'
        document.getElementById("containesvistaoferta").innerHTML = formularioHTML;
        // Llama a la función después de que el formulario haya sido cargado
        obtenerOfertaEmpleo(empresa);
      
      }

            function cargarvistaoferta(empresa) {
        // Código HTML del formulario
        const formularioHTML = `
         <input type="number"  id="idoferta" name="idoferta" value="" hidden>
              <!-- Sección Título -->
              <section class="job-title">
                  <h2 id="titulo">Título de la Oferta</h2>
                  
              </section>
            
            
        <section class="job-details">
           <h3>Detalles del Empleo</h3>
<p style="display: none;"><strong>Nombre de la Empresa: </strong> <span id="nombreempresa"></span></p>
<p style="display: none;"><strong>Ubicación: </strong> <span id="ubicacion"></span></p>
<p style="display: none;"><strong>Salario: </strong> De <span id="pagomin"></span> a <span id="pagomax"></span></p>
<p style="display: none;"><strong>Oportunidad Disponible: </strong> Desde <span id="desde"></span> Hasta <span id="hasta"></span></p>
<p style="display: none;"><strong>Tipo de Contrato:</strong> <span id="nombrecontrato"></span></p>
<p style="display: none;"><strong>Disponibles: </strong> <span id="plazas"></span></p>
<p style="display: none;"><strong>Edad Mínima: </strong> <span id="edadmin"></span></p>
<p style="display: none;"><strong>Edad Máxima: </strong> <span id="edadmax"></span></p>
<p style="display: none;"><strong>Nivel Educativo: </strong> <span id="nombreeduc"></span></p>
        </section>
        
        <!-- Descripción de Epic Calling -->
        <section class="job-epic-calling">
          
            <p id="epicCalling">Descripción del Epic Calling</p>
        </section>

<section class="job-offers" >

</section>
        <a  class="apply-button" onClick="aplicarofertas()">Aplicar Ahora</a>
      <div class="summary" id="ofrecimientos">
          <h4>Resumen del Puesto</h4>
          <p><strong>Título:</strong> <span id="resumen-titulo">Desarrollador Full-Stack Senior</span></p>
          <p><strong>Ubicación:</strong> <span id="resumen-ubicacion">Ciudad de México</span></p>
          <p><strong>Salario:</strong> <span id="resumen-salario">$30,000 - $45,000 MXN</span></p>
          <p><strong>Fechas:</strong> <span id="resumen-fechas">01/10/2024 - 01/10/2025</span></p>
          <p><strong>Plazas:</strong> <span id="resumen-plazas">3</span></p>
      </div>
      
      `;   
        // Insertar el formulario en el div con id 'contenido'
        document.getElementById("containesvistaoferta").innerHTML = formularioHTML;
        // Llama a la función después de que el formulario haya sido cargado
        obtenerOfertaEmpleo(empresa);
      
      }

            function cargarvista() {
        // Código HTML del formulario
        const formularioHTML = `
                        <div class="container-ofertas-empleador">
                    <!-- Sección Izquierda: Ofertas de Empleo -->
                    <div class="left-section-empleador"id="ofertasitem">

            
                        <!-- Más ofertas se pueden añadir aquí -->
                    </div>
            
                    <!-- Sección Derecha: Aplicaciones de los Candidatos -->
                    <div class="right-section-empleador" id="candidatositem">
                      
            
                        <!-- Más aplicaciones se pueden añadir aquí -->
                    </div>
            </div>
      
      `;   
        // Insertar el formulario en el div con id 'contenido'
        document.getElementById("contenido").innerHTML = formularioHTML;
        // Llama a la función después de que el formulario haya sido cargado
        llenarofertas()
      
      }
      
      function modalshow(empresa) {
        
        const elemento = document.getElementById('jobModal');
        if (elemento.style.display === 'none') {
            elemento.style.display = 'block'; // Muestra el elemento
            cargarvistaoferta(empresa);
        } else {
            elemento.style.display = 'none'; // Oculta el elemento
        }
      
      }
      
      // Función para obtener datos del servidor y llenar el formulario
      function obtenerOfertaEmpleo(idOferta) {
        // Realiza una solicitud al backend usando POST
        fetch(_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Enviar el id de la oferta en el cuerpo de la solicitud
            body: JSON.stringify({ 
              q: 'formularioofertaempleador',
              idoferta: idOferta })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
         
            if (data && data.length > 0) {
                let oferta = data[0]; // Obtener el primer objeto de la lista
                
                function mostrarSiExiste(elementId, valor, mensajeVacio) {
                  let element = document.getElementById(elementId);
                  let parent = element.parentElement;
                  if (!valor || valor === 0 || valor === "") {
                      parent.style.display = 'none';
                  } else {
                      element.textContent = valor;
                      parent.style.display = 'block';
                  }
                }
                
                // Asignar valores a los campos o mostrar mensaje de "Datos no proporcionados"
                document.getElementById('idoferta').value = oferta.Id;
                mostrarSiExiste('titulo', oferta.Titulo);
                mostrarSiExiste('ubicacion', oferta.Ubicacion);
                mostrarSiExiste('pagomin', oferta.PagoMin ? `$${oferta.PagoMin}` : null);
                mostrarSiExiste('pagomax', oferta.PagoMax ? `$${oferta.PagoMax}` : null);
                mostrarSiExiste('nombreempresa', desLimpiar(oferta.nombreempress));
                mostrarSiExiste('epicCalling', desLimpiar(oferta.EpicCalling));
                mostrarSiExiste('desde', new Date(oferta.Desde).toLocaleDateString());
                mostrarSiExiste('hasta', new Date(oferta.Hasta).toLocaleDateString());
                mostrarSiExiste('plazas', oferta.Plazas);
                mostrarSiExiste('nombrecontrato', oferta.nombrecontrato);
                mostrarSiExiste('edadmin', oferta.edadmin !== 0 ? oferta.edadmin : "");
                mostrarSiExiste('edadmax', oferta.edadmax !== 0 ? oferta.edadmax : "");
                mostrarSiExiste('nombreeduc', oferta.nombreeduc);
                
                          
                          // Ofrecimientos
                          let jobOffersSection = document.querySelector('.job-offers');
                
                          // Limpiar la sección antes de agregar nuevos elementos
                   
                          
                          // Verificar si hay ofrecimientos
                          if (oferta.Ofrecimientos.length > 0) {
                              // Crear el título "Lo que ofrecemos"
                              let titulo = document.createElement('h3');
                              titulo.textContent = 'Lo que ofrecemos';
                          
                              // Crear el ul con id "ofrecimientos"
                              let listaOfrecimientos = document.createElement('ul');
                              listaOfrecimientos.classList.add('offers-list');
                              listaOfrecimientos.id = 'ofrecimientos';
                          
                              // Llenar la lista con los ofrecimientos
                              oferta.Ofrecimientos.forEach(ofrecimiento => {
                                  let item = document.createElement('li');
                                  item.textContent = ofrecimiento.descripcion;
                                  listaOfrecimientos.appendChild(item);
                              });
                          
                              // Agregar el título y la lista a la sección
                              jobOffersSection.appendChild(titulo);
                              jobOffersSection.appendChild(listaOfrecimientos);
                          } else {
                              // Crear el título "Lo que ofrecemos"
                              let titulo = document.createElement('h3');
                              titulo.textContent = 'Lo que ofrecemos';
                          
                              // Crear el ul con id "ofrecimientos"
                              let listaOfrecimientos = document.createElement('ul');
                              listaOfrecimientos.classList.add('offers-list');
                              listaOfrecimientos.id = 'ofrecimientos';
                          
                              // Si no hay ofrecimientos, mostrar mensaje "Datos no proporcionados por el empleador"
                              // let item = document.createElement('li');
                              // item.textContent = 'Datos no proporcionados por el empleador';
                              // listaOfrecimientos.appendChild(item);
                          
                              // Agregar el título y la lista a la sección
                              jobOffersSection.appendChild(titulo);
                              jobOffersSection.appendChild(listaOfrecimientos);
                          }
                          
                 
                          let jobRequirementsSection = document.querySelector('.job-requirements');
                
                          // Limpiar la sección antes de agregar nuevos elementos
                          jobRequirementsSection.innerHTML = '';
                          
                          // Verificar si hay requisitos
                          if (oferta.Requisitos.length > 0) {
                              // Crear el título "Requisitos para el puesto"
                              let titulo = document.createElement('h3');
                              titulo.textContent = 'Requisitos para el puesto';
                          
                              // Crear el ul con id "requisitos"
                              let listaRequisitos = document.createElement('ul');
                              listaRequisitos.classList.add('requirements-list');
                              listaRequisitos.id = 'requisitos';
                          
                              // Llenar la lista con los requisitos
                              oferta.Requisitos.forEach(requisito => {
                                  let item = document.createElement('li');
                                  item.textContent = requisito.descripcion;
                                  listaRequisitos.appendChild(item);
                              });
                          
                              // Agregar el título y la lista a la sección
                              jobRequirementsSection.appendChild(titulo);
                              jobRequirementsSection.appendChild(listaRequisitos);
                          } else {
                              // Crear el título "Requisitos para el puesto"
                              let titulo = document.createElement('h3');
                              titulo.textContent = 'Requisitos para el puesto';
                          
                              // Crear el ul con id "requisitos"
                              let listaRequisitos = document.createElement('ul');
                              listaRequisitos.classList.add('requirements-list');
                              listaRequisitos.id = 'requisitos';
                          
                              // Si no hay requisitos, mostrar mensaje "Datos no proporcionados por el empleador"
                              // let item = document.createElement('li');
                              // item.textContent = 'Datos no proporcionados por el empleador';
                              // listaRequisitos.appendChild(item);
                          
                              // Agregar el título y la lista a la sección
                              jobRequirementsSection.appendChild(titulo);
                              jobRequirementsSection.appendChild(listaRequisitos);
                          }
                          
      
         // Llenar los campos de resumen
         document.getElementById('resumen-titulo').textContent = oferta.Titulo;
         document.getElementById('resumen-ubicacion').textContent = oferta.Ubicacion;
         document.getElementById('resumen-salario').textContent = `${oferta.PagoMin} $ || ${oferta.PagoMax} $`;
         document.getElementById('resumen-fechas').textContent = `${new Date(oferta.Desde).toISOString().slice(0, 10)} || ${new Date(oferta.Hasta).toISOString().slice(0, 10)}`;
         document.getElementById('resumen-plazas').textContent = oferta.Plazas;
            }
        })
        .catch(error => console.error('Error al obtener los datos:', error));
      }
        function cancelarofertas(idOferta) {
          var oferta = idOferta;
            var _pagina = _url + "Q=cancelaroferta&idoferta=" + oferta;
          
            fetch(_pagina)
            .then(response => response.text())
            .then(data => {
              alert(data)
            })
            .catch(error => console.error('Error:', error));
          }
          function activarofertas(idOferta) {
            var oferta = idOferta;
              var _pagina = _url + "Q=reactivaroferta&idoferta=" + oferta;
            
              fetch(_pagina)
              .then(response => response.text())
              .then(data => {
                alert(data)
              })
              .catch(error => console.error('Error:', error));
            }

           


function goBack() {
    window.history.go(-1); // Ir a la página anterior
}
