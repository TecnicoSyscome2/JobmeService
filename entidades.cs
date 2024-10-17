using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobmeServiceSyscome
{
    public class OfertaEmpleo
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Ubicacion { get; set; }
        public decimal PagoMin { get; set; }
        public decimal PagoMax { get; set; }
        public int IdEmpresa { get; set; }
        public string nombreempress { get; set; }
        public string EpicCalling { get; set; }
        public DateTime Desde { get; set; }
        public DateTime Hasta { get; set; }
        public int Plazas { get; set; }
        public int Contrato { get; set; }
        public string nombrecontrato { get; set; }
        public int edadmin { get; set; }
        public int edadmax { get; set; }
        public int niveleduc { get; set; }
        public string nombreeduc { get; set; }

        public List<ofrecimientosempleo> Ofrecimientos { get; set; }
        public List<requisitos> Requisitos { get; set; }
        public OfertaEmpleo() {
            Ofrecimientos = new List<ofrecimientosempleo>();
            Requisitos = new List<requisitos>();
        }
    }

    public class Candidato
    {
        public string Usuario { get; set; }           // Nombre de usuario del candidato
        public string Clave { get; set; }             // Clave o contraseña
        public string Apellido { get; set; }          // Apellido del candidato
        public string Nombre { get; set; }            // Nombre del candidato
        public string Pais { get; set; }              // País de residencia
        public string Departamento { get; set; }      // Departamento o estado
        public string Municipio { get; set; }         // Municipio o ciudad
        public DateTime FechaNacimiento { get; set; } // Fecha de nacimiento
        public string Telefono { get; set; }          // Número de teléfono
        public string Correo { get; set; }            // Correo electrónico
        public string LinkedIn { get; set; }          // Perfil de LinkedIn
        public string UsuarioTipo { get; set; }       // Tipo de usuario (Ej. Empleador, Candidato)
    }

    public class ofrecimientosempleo
    {
        public int id { get; set; }
        public int idoferta { get; set; }
        public string descripcion { get; set; }
        public ofrecimientosempleo() 
        { }
    }
    public class requisitos
    {
        public int id { get; set; }
        public int idempress { get; set; }
        public string descripcion { get; set; }
        public requisitos() 
        { }
    }
}
