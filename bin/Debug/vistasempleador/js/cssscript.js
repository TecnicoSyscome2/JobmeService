
  // Obtener el modal
  var modal = document.getElementById("jobModal");
  
  // Obtener el botón de cerrar
  var closeBtn = document.querySelector(".close");
  
  // Mostrar el modal (puedes llamar esta función cuando desees abrir el modal)
  function mostrarModal() {
    modal.style.display = "block";
  }
  
  // Cerrar el modal cuando se hace clic en el botón de cerrar
  closeBtn.onclick = function() {
    modal.style.display = "none";
  }