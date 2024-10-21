


//var _url = "http://localhost:9010/?";
var _url = "http://192.168.1.35:9010/?"
var _urlrutas = "http://192.168.1.35:9010/"
function ActualizarPagina(url2) {
  var _pagina = _urlrutas + url2;
  fetch(_pagina)
  .then(response => response.text())
  .then(data => {
    document.getElementById("contenido").innerHTML = data;


  })
  .catch(error => console.error('Error:', error));
}

  function logout() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', _url + 'q=logout', true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          //alert('Has cerrado sesion exitosamente!');
          window.location.href = '/'; // Redirigir a la página de login
        } else {
          //alert('Error al cerrar sesion. Por favor intentelo de nuevo.');
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

document.querySelectorAll(".inputEnter").forEach(function(input) {
  input.addEventListener("keydown", function(event) {
      // Detectar si la tecla presionada es Enter (código 13)
      if (event.key === "Enter") {
          event.preventDefault(); // Evitar la acción predeterminada si es necesario
          agregarFila2() // Pasar el input actual a la función
      }
  });
});
function llenartipocontrato() {

  var _pagina = _url + "q=listacontratos";
  
  fetch(_pagina)
  .then(response => response.text())
  .then(data => {
  document.getElementById("contrato").innerHTML = data;
  })
  .catch(error => console.error('Error:', error));
  }

function llenarofertas(oferta) {

  var _pagina = _url + "Q=listaofertasempleo&empresa=" + oferta;

  fetch(_pagina)
  .then(response => response.text())
  .then(data => {
    document.getElementById("joblist").innerHTML = data;
  })
  .catch(error => console.error('Error:', error));
}
function llenarempresas() {

var _pagina = _url + "q=listaempresas";

fetch(_pagina)
.then(response => response.text())
.then(data => {
  document.getElementById("empleadoritem").innerHTML = data;
})
.catch(error => console.error('Error:', error));
}
llenarempresas();

function cargarvistaoferta(empresa) {
  // Código HTML del formulario
  const formularioHTML = `
   <input type="number"  id="idoferta" name="idoferta" value="" hidden>
        <!-- Sección Título -->
        <section class="job-title">
            <h2 id="titulo">Título de la Oferta</h2>
            
        </section>
      
      
        <!-- Detalles de la Oferta -->
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
<!-- Requisitos del Puesto -->
<section class="job-requirements">

</section>
<div class='row'>
 <a  class="apply-button " onClick="aplicarofertas()">Aplicar Ahora</a>
 <a  class="apply-button-cancelar" onClick="cancelarofertas()">Cancelar Oferta</a>
</div>
 
<div class="summary">
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
        q: 'formulariooferta',
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
          
         // Mostrar solo si el dato está disponible
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
function aplicarofertas() {
var oferta = document.getElementById('idoferta').value;
  var _pagina = _url + "Q=aplicaroferta&idoferta=" + oferta;

  fetch(_pagina)
  .then(response => response.text())
  .then(data => {
    alert(data)
  })
  .catch(error => console.error('Error:', error));
}
function cancelarofertas() {
  var oferta = document.getElementById('idoferta').value;
    var _pagina = _url + "Q=cancelaroferta&idoferta=" + oferta;
  
    fetch(_pagina)
    .then(response => response.text())
    .then(data => {
      alert(data)
    })
    .catch(error => console.error('Error:', error));
  }

  function cargarDatosCandidato() {
    // Realizar la solicitud GET al servidor con el idCandidato como parámetro en la URL
    fetch( _url + 'q=formulariodatoscandidato', {  // Reemplaza '/ruta/api/candidato' con la ruta correcta de tu servidor
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(candidatos => {
        if (candidatos.length > 0) {
            const candidato = candidatos[0]; // Usar el primer candidato recibido

            // Seleccionar todos los elementos con la clase "data"
            const campos = document.querySelectorAll('.data');

            // Iterar sobre cada campo y rellenarlo dinámicamente
            campos.forEach(campo => {
                const campoId = campo.id; // Obtener el ID del campo
                if (campoId && candidato.hasOwnProperty(campoId)) {
                    if (campo.type === "date") {
                        campo.value = candidato[campoId].split('T')[0]; // Ajustar el formato de la fecha
                    } else {
                        campo.value = candidato[campoId]; // Asignar el valor correspondiente
                    }
                }
            });
        }
    })
    .catch(error => {
        console.error('Error al cargar los datos del candidato:', error);
    });
}


function cargarvistadatoscandidato() {
  // Código HTML del formulario
  const formularioHTML = `
       <div class="card-candidato">
        <div class="card-header-candidato">Datos del Candidato</div>
        <div class="card-body-candidato">
            <!-- Espacio para la foto del candidato -->
            <div class="foto-candidato">
                <div class="foto-candidato-placeholder">
                    <img src="path/to/foto.jpg" alt="Foto del Candidato">
                </div>
            </div>

            <!-- Espacio para los datos personales -->
            <div class="info-candidato">
                <!-- Primera columna (Nombre, Apellido, Correo) -->
                <div class="columna-datos">
                    <div>
                <label for="nombre">Nombre</label>
                <input type="text" id="Nombre" class="data" disabled>
            </div>
            <div>
                <label for="apellido">Apellido</label>
                <input type="text" id="Apellido" class="data" disabled>
            </div>
            <div>
                <label for="fech_nacim">Fecha de Nacimiento</label>
                <input type="date" id="FechaNacimiento" class="data" disabled>
            </div>

                </div>
                
                <!-- Segunda columna (Teléfono, LinkedIn) -->
                <div class="columna-datos">
                    <div>
                <label for="telefono">Teléfono</label>
                <input type="text" id="Telefono" class="data" disabled>
            </div>
            <div>
                <label for="correo">Correo Electrónico</label>
                <input type="email" id="Correo" class="data" disabled>
            </div>
            <div>
                <label for="linkedin">LinkedIn</label>
                <input type="text" id="LinkedIn" class="data" disabled>
            </div>
                </div>
                <div class="columna-datos">
                    <div>
                        <label for="pais">País</label>
                        <input type="text" id="pais" class="data" disabled>
                    </div>
                    <div>
                        <label for="departamento">Departamento</label>
                        <input type="text" id="departamento" class="data" disabled>
                    </div>
                    <div>
                        <label for="municipio">Municipio</label>
                        <input type="text" id="municipio" class="data" disabled>
                    </div> 
                </div>
            </div>
        </div>

        <!-- Espacio para otros datos debajo de la foto y datos personales -->
        <div class="otros-datos">


            <div>
                <label for="cv">CV</label>
                <input type="text" id="cv" disabled>
            </div>
        </div>
    </div>
</div>
`;   
  // Insertar el formulario en el div con id 'contenido'
  document.getElementById("contenido").innerHTML = formularioHTML;
  // Llama a la función después de que el formulario haya sido cargado
  cargarDatosCandidato()

}


