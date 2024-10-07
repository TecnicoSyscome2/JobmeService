var _url = "http://localhost:9010/?verif=scm64&q=";
        // Función para cargar las ofertas de empleo en el div con id "joblist"

        function llenarofertas() {

            var _pagina = _url + "listaofertasempleo";
        
            fetch(_pagina)
            .then(response => response.text())
            .then(data => {
              document.getElementById("joblist").innerHTML = data;
            })
            .catch(error => console.error('Error:', error));
          }

        // Llama a la función para cargar las ofertas de empleo cuando la página se carga
        
  
            llenarofertas();
 

        function llenarempresas() {

          var _pagina = _url + "listaempresas";
      
          fetch(_pagina)
          .then(response => response.text())
          .then(data => {
            document.getElementById("empleadoritem").innerHTML = data;
          })
          .catch(error => console.error('Error:', error));
        }

      // Llama a la función para cargar las ofertas de empleo cuando la página se carga
      
     
        llenarempresas();
  