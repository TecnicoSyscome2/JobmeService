using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Net.Mail;
using static System.Net.WebRequestMethods;
using File = System.IO.File;

using MySqlConnector;

namespace JobmeServiceSyscome
{
    public class Program
    {
        public static MySqlConnection Conexion()
        {
            if (File.Exists("conn.ini") == false)
            {
                File.WriteAllText("conn.ini", "Server=localhost;Database=myplan_jobpost;Uid=root;Pwd=230680;ConvertZeroDateTime=True;Allow User Variables=true;");
            }
            String _connstring = File.ReadAllText("conn.ini");
            MySqlConnection _conn = new MySqlConnection();
            _conn.ConnectionString = _connstring;
            return _conn;
        }
        public static MySqlCommand Comando(MySqlConnection pConn)
        {
            MySqlCommand _comm = new MySqlCommand();
            _comm.Connection = pConn;
            return _comm;
        }
        public MySqlConnection Conexion3()
        {
            if (File.Exists("conn.ini") == false)
            {
                File.WriteAllText("conn.ini", "Server=localhost;Database=myplan_jobpost;Uid=root;Pwd=230680");
            }
            String _connstring = File.ReadAllText("conn.ini");
            MySqlConnection _conn = new MySqlConnection();

            _conn.ConnectionString = _connstring;
            return _conn;
        }
        public MySqlCommand Comando3(MySqlConnection pConn)
        {
            MySqlCommand _comm = new MySqlCommand();
            _comm.Connection = pConn;
            return _comm;
        }
        public static MySqlParameter Parametro(String pNombre, DbType pTipo, Object pValor)
        {
            MySqlParameter _parm = new MySqlParameter(pNombre, pValor);
            _parm.DbType = pTipo;
            return _parm;
        }

        public static DataTable Query(String pQuery)
        {
            DataTable _t = new DataTable();
            var _conn = Conexion();
            var _comm = Comando(_conn);
            _conn.Open();
            _comm.CommandText = pQuery;
            IDataReader _reader = _comm.ExecuteReader();
            _t.Clear();
            _t.Load(_reader);
            _conn.Close();
            _conn.Dispose();
            return _t;
        }


        public static String FechaSQL(DateTime pFecha)
        {
            return pFecha.Year.ToString() + "-" +
                pFecha.Month.ToString().PadLeft(2, '0') + "-" +
                pFecha.Day.ToString().PadLeft(2, '0');
        }

        public static void Main(string[] args)
        {
            if (File.Exists("PuertoActual.inf") == false)
            {
                using (StreamWriter _rw = File.CreateText("puertoactual.inf"))
                {
                    _rw.WriteLine("9010");
                    _rw.WriteLine("localhost");
                }
            }
            string _myport = "";
            string _servidor = "";
            using (StreamReader _rd = File.OpenText("puertoactual.inf"))
            {
                _myport = _rd.ReadLine();
                _servidor = _rd.ReadLine();
            }
            string _servicio = string.Format("http://{0}:{1}/", _servidor, _myport);
            string prefix = _servicio;
            string rootDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "vistas");
            Login login = new Login();
            HttpListener listener = new HttpListener();
            listener.Prefixes.Add(prefix);
            listener.Start();
            Console.WriteLine($"Ejecutando Servicio en {prefix}...");
            string filePath = Path.Combine(rootDirectory, "Login/login.html");
            while (true)
            {
                HttpListenerContext context = listener.GetContext();
                try
                {
                    login.HandleLogin(context);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error");
                }
            }
        }
        public static int EjecutarConsulta(string pConsulta)
        {
            int resultado = 0;
            using (MySqlConnection _conn = Conexion())
            {
                using (MySqlCommand _comm = new MySqlCommand(pConsulta, _conn))
                {
                    _conn.Open();

                    using (var reader = _comm.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            resultado = reader.GetInt32(0); // Obtener el primer valor de la primera fila
                        }
                    }
                }
            }
            return resultado;
        }
        public static string EjecutarConsultastring(string pConsulta)
        {
            string resultado = "";
            using (MySqlConnection _conn = Conexion())
            {
                using (MySqlCommand _comm = new MySqlCommand(pConsulta, _conn))
                {
                    _conn.Open();

                    using (var reader = _comm.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            resultado = reader.GetString(0); // Obtener el primer valor de la primera fila
                        }
                    }
                }
            }
            return resultado;
        }
        public static DataTable Query2(String pQuery)
        {
            DataTable _t = new DataTable();
            var _conn = Conexion();
            var _comm = Comando(_conn);
            _conn.Open();
            _comm.CommandText = pQuery;
            IDataReader _reader = _comm.ExecuteReader();
            _t.Load(_reader);
            _conn.Close();
            _conn.Dispose();
            return _t;
        }

        public void SendResponse(HttpListenerContext request, string rootDirectory, string verif)
        {
            string rootDirectorycandidatos = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "vistascandidatos");
            string rootDirectoryempleador = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "vistasempleador");
            string sessionId = request.Request.Cookies["sessionId"]?.Value;
            string url = request.Request.Url.AbsolutePath.Trim('/');
            string url2 = request.Request.Url.PathAndQuery;
            string url3 = request.Request.Url.Query;
            LimpiarUrl(url3);
            var query = request.Request.QueryString;
            Int32 coun = query.Count;
            String _q = query["q"];
            string filePath = Path.Combine(rootDirectory, url);
            var requestType = request.Request.HttpMethod;
            var queryParams = request.Request.QueryString;
            string username = query["username"];
            string password = query["password"];
            String _verif = query["verif"];
           
            var sessionInfo = SessionManager.GetSession(request.Request.Cookies["sessionID"].Value);
            if (sessionInfo.IsValid)
            {
                // Usar la tupla directamente
                var (Username, Empresa, Expiration, Tipouser) = (sessionInfo.Username, sessionInfo.Empresa, sessionInfo.Expiration, sessionInfo.Tipouser);
                // Muestra los datos recibidos
                Console.WriteLine($"Usuario: {Username}");
                Console.WriteLine($"Empresa: {Empresa}");
                Console.WriteLine($"Expiración: {Expiration}");               
            }
            if (requestType.Equals("GET", StringComparison.OrdinalIgnoreCase) && sessionInfo.Tipouser == "1")
                {                 

                if (sessionInfo.Verif != "scm64")
                {
                    ServeHTMLError(request.Response, "Acceso Denegado");
                }
                else if (coun >= 1)
                {
                    try
                    {                     
                        if (_q == "agregar_oferta")
                        {
                            DataTable t = JsonConvert.DeserializeObject<DataTable>(query["datos"]);
                            DataTable requisitosTable = JsonConvert.DeserializeObject<DataTable>(query["requisitos"]);
                            DataTable ofertasofrecimientoTable = JsonConvert.DeserializeObject<DataTable>(query["ofertaofrecimiento"]);
                            try
                            {
                                DataTable _t = t;
                                String _tabla = query["tabla"];
                                String _insert = "INSERT INTO " + _tabla + " set ";
                                Int32 _llevo = 0;
                                foreach (DataRow _r in _t.Rows)
                                {
                                    _llevo++;
                                    if (_llevo > 1)
                                        _insert += ", ";
                                    _insert += String.Format("{0} = '{1}'", _r[0], _r[1]);
                                }
                                string empre = sessionInfo.Empresa;
                                var _conn = Conexion();
                                var _comm = Comando(_conn);
                                _conn.Open();
                                _comm.CommandText = _insert + String.Format(", idempress = {0}; ", empre);
                                try
                                {
                                    _comm.ExecuteNonQuery();
                                    // Obtener el ID de la oferta de empleo recién insertada
                                    _comm.CommandText = "SELECT LAST_INSERT_ID();";
                                    var ofertaId = Convert.ToInt32(_comm.ExecuteScalar());
                                    foreach (DataRow requisito in requisitosTable.Rows)
                                    {
                                        string insertRequisito = "INSERT INTO requisitos (idoferta, descripcion) VALUES (@idoferta, @campo)";
                                        var cmdRequisito = Comando(_conn);
                                        cmdRequisito.Parameters.AddWithValue("@idoferta", ofertaId);
                                        cmdRequisito.Parameters.AddWithValue("@campo", requisito["descripcion"]);
                                        cmdRequisito.CommandText = insertRequisito;
                                        cmdRequisito.ExecuteNonQuery();
                                    }
                                    foreach (DataRow ofrecimiento in ofertasofrecimientoTable.Rows)
                                    {
                                        string insertRequisito = "INSERT INTO ofertaofrecimiento (idoferta, descripcion) VALUES (@idoferta, @campo)";
                                        var cmdRequisito = Comando(_conn);
                                        cmdRequisito.Parameters.AddWithValue("@idoferta", ofertaId);
                                        cmdRequisito.Parameters.AddWithValue("@campo", ofrecimiento["descripcion4"]);
                                        cmdRequisito.CommandText = insertRequisito;
                                        cmdRequisito.ExecuteNonQuery();
                                    }
                                }
                                catch (Exception ex)
                                {
                                    ServeHTMLError(request.Response, ex.Message);
                                }
                                finally
                                {
                                    _conn.Close();
                                    _conn.Dispose();
                                    ServeHTML(request.Response, empre);
                                }
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine("Error al guardar datos: " + ex.Message);
                            }
                        }
                        else if (_q == "eliminar")
                        {
                            String _tabla = query["tabla"];
                            String _codigo = query["codigo"];
                            String _valor = query["valor"];
                            String _insert = String.Format("delete from {0} where {1} = '{2}'", _tabla, _codigo, _valor);
                            var _conn = Conexion();
                            var _comm = Comando(_conn);
                            _conn.Open();
                            _comm.CommandText = _insert;
                            try
                            {
                                _comm.ExecuteNonQuery();
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine("Error al eliminar datos");
                            }
                            finally
                            {
                                _conn.Close();
                                _conn.Dispose();
                            }
                            ServeHTML(request.Response, "<span class='badge badge-success'>Registro Eliminado Con Exito</span>");
                        }
                        if (_q == "listacontratos")
                        {
                            var _conn = Conexion();
                            var _comm = Comando(_conn);
                            String _retval = "";
                            _conn.Open();
                            _comm.CommandText = String.Format("Select * from tipocontrato");
                            var _reader = _comm.ExecuteReader();
                            while (_reader.Read())
                            {
                                _retval += String.Format("<option value='{0}'>{1}</option>", _reader.GetValue(0).ToString(), _reader.GetValue(1).ToString());
                            }
                            _conn.Close();
                            _conn.Dispose();
                            ServeHTML(request.Response, _retval);
                        }
                        if (_q == "listaniveleducativo")
                        {
                            var _conn = Conexion();
                            var _comm = Comando(_conn);
                            String _retval = "";
                            _conn.Open();
                            _comm.CommandText = String.Format("Select * from niveleducativo");
                            var _reader = _comm.ExecuteReader();
                            while (_reader.Read())
                            {
                                _retval += String.Format("<option value='{0}'>{1}</option>", _reader.GetValue(0).ToString(), _reader.GetValue(1).ToString());
                            }
                            _conn.Close();
                            _conn.Dispose();
                            ServeHTML(request.Response, _retval);
                        }

                        if (_q == "listaofertasempleo")
                        {
                            String empresa = sessionInfo.Empresa;
                            String nombre = query["nombre"];
                            String cons = String.Format(@"SELECT * FROM ofertasempleo where idempress = {0}", empresa);
                            DataTable dt = new DataTable();
                            dt = Query(cons);
                            String Html = GenerarListaTrabajosempleador(dt);
                            ServeHTML(request.Response, Html);
                        }
                        if (_q == "listadecandidatosparaoferta")
                        {
                            String ofert = query["idoferta"];                          
                            String cons = String.Format(@"SELECT * FROM aplicarofertas where idempresa = {0} and idoferta = '{1}'"
                            , sessionInfo.Empresa, ofert);
                            DataTable dt = new DataTable();
                            dt = Query(cons);
                            
                            String Html = GenerarListaCandidatos(dt, Convert.ToInt32(sessionInfo.Empresa));
                            ServeHTML(request.Response, Html);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        ServeHTMLError(request.Response, "Error en alguna q");
                    }
                }
                else 
                {
                    try
                    {
                        if (string.IsNullOrEmpty(url) || url == "/")
                        {
                            filePath = Path.Combine(rootDirectory, "index.html");
                        }
                        if (url == " form_candidatos")
                        {
                            filePath = Path.Combine(rootDirectory, "form_candidatos.html");
                        }
                        if (url == "form_empleadoresinterno")
                        {
                            filePath = Path.Combine(rootDirectory, "views/empleador/form_empleadores.html");
                        }
                        if (url == "verimg")
                        {
                            string originalString = url3;
                            string modifiedString = originalString.Replace("?", "");
                            String _codigo = modifiedString;
                            String _ruta = "";
                            var _conn = Conexion();
                            var _comm = Comando(_conn);

                            _conn.Open();
                            _comm.CommandText = String.Format("Select ruta from emplimg where codempl = {0}", _codigo);
                            var ruta = _comm.ExecuteReader();
                            ruta.Read();
                            _ruta = ruta.GetString(0);

                            _conn.Close();
                            _conn.Dispose();
                            filePath = Path.Combine(Directory.GetCurrentDirectory(), "images", _ruta);
                        }
                        if (File.Exists(filePath))
                        {
                            ServeFile(request.Response, filePath);
                        }
                        else
                        {
                            Serve404(request.Response);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error al enviar las vistas");
                    }
                }              
            }
            if (requestType.Equals("GET", StringComparison.OrdinalIgnoreCase) && sessionInfo.Tipouser == "2")
            {

                if (sessionInfo.Verif != "scm64")
                {
                    ServeHTMLError(request.Response, "Acceso Denegado");
                }
                else if(coun >= 1)
                {
                    try
                    {
                        if (_q == "aplicaroferta") 
                        {
                            string idoferta = query["idoferta"];
                            string idcandidato = sessionInfo.Username;
                            string fecha = DateTime.Now.ToString("yyyy-MM-dd");
                            var _conn = Conexion();
                            var _comm = Comando(_conn);
                            _conn.Open();
                            _comm.CommandText = String.Format("Select id from cv_candidatos where usuario = '{0}'", idcandidato);
                            var cv = _comm.ExecuteScalar();
                            string _cv = cv.ToString();

                            _conn.Close();
                            _conn.Open();
                            _comm.CommandText = String.Format("Select idempress from ofertasempleo where id = '{0}'", idoferta);
                            var idempres = _comm.ExecuteScalar();
                            string _idempres = cv.ToString();

                            _conn.Close();

                            _conn.Open();
                            _comm.CommandText = String.Format(@"insert into aplicarofertas set idcandidato = '{0}', idoferta = '{1}', 
                            fecha = '{2}', idcv = '{3}', activa = '1', idempresa = '{4}'", idcandidato, idoferta, fecha, _cv, idempres);
                            _comm.ExecuteNonQuery();
                            _conn.Close();
                            _conn.Dispose();
                            ServeHTML(request.Response, "exito");
                        }
                        if (_q == "cancelaroferta")
                        {
                            try {
                                string idoferta = query["idoferta"];
                                string idcandidato = sessionInfo.Username;
                                string fecha = DateTime.Now.ToString("yyyy-MM-dd");
                                var _conn = Conexion();
                                var _comm = Comando(_conn);
                                _conn.Open();
                                _comm.CommandText = String.Format("Select id from aplicarofertas where idcandidato = '{0}' and idoferta = '{1}'", idcandidato, idoferta);
                                var aplicacion = _comm.ExecuteScalar();
                                string _aplicacion = aplicacion.ToString();
                                _conn.Close();
                                _conn.Open();
                                _comm.CommandText = String.Format(@"UPDATE aplicarofertas SET activa = '0' WHERE id = '{0}';", aplicacion);
                                _comm.ExecuteNonQuery();
                                _conn.Close();
                                _conn.Dispose();
                                ServeHTML(request.Response, "Cancelacion de solicitud de oferta exitoso");
                            } catch 
                            {
                                ServeHTML(request.Response, "Upss, Ocurrio un problema por favor intentelo de nuevo");
                            }
                           
                        }
                        if (_q == "reactivaroferta")
                        {
                            string idoferta = query["idoferta"];
                            string idcandidato = sessionInfo.Username;
                            string fecha = DateTime.Now.ToString("yyyy-MM-dd");
                            var _conn = Conexion();
                            var _comm = Comando(_conn);
                            _conn.Open();
                            _comm.CommandText = String.Format("Select id from aplicarofertas where usuario = '{0}' and idoferta = '{1}'", idcandidato, idoferta);
                            var aplicacion = _comm.ExecuteScalar();
                            string _aplicacion = aplicacion.ToString();

                            _conn.Close();
                            _conn.Open();
                            _comm.CommandText = String.Format(@"UPDATE aplicarofertas SET activa = '1' WHERE id = '{0}';", aplicacion);
                            _comm.ExecuteNonQuery();
                            _conn.Close();
                            _conn.Dispose();
                            ServeHTML(request.Response, "exito");
                        }

                        if (_q == "listaofertasempleo")
                        {
                            String empresa = query["empresa"];
                            String nombre = query["nombre"];
                            String cons = String.Format(@"SELECT * FROM ofertasempleo where idempress = {0}", empresa
                            );
                            DataTable dt = new DataTable();
                            dt = Query(cons);
                            String Html = GenerarListaTrabajos(dt);
                            ServeHTML(request.Response, Html);
                        }
                        if (_q == "listaempresas")
                        {
                            String empresa = query["empresa"];
                            String nombre = query["nombre"];
                            String cons = String.Format(@"SELECT * FROM empleador"
                            );
                            DataTable dt = new DataTable();
                            dt = Query(cons);
                            String Html = GenerarListaEmpleadores(dt);
                            ServeHTML(request.Response, Html);
                        }
                    }
                    catch (Exception ex) 
                    {
                        Console.WriteLine(ex.Message);
                        ServeHTMLError(request.Response, "Error en alguna q");
                    }              
                }
                else
                {
                    try
                    {
                        if (string.IsNullOrEmpty(url) || url == "/")
                        {
                            filePath = Path.Combine(rootDirectory, "index.html");
                        }
                        if (url == " form_candidatos")
                        {
                            filePath = Path.Combine(rootDirectory, "form_candidatos.html");
                        }
                        if (url == "verimg")
                        {
                            string originalString = url3;
                            string modifiedString = originalString.Replace("?", "");
                            String _codigo = modifiedString;
                            String _ruta = "";
                            var _conn = Conexion();
                            var _comm = Comando(_conn);

                            _conn.Open();
                            _comm.CommandText = String.Format("Select ruta from emplimg where codempl = {0}", _codigo);
                            var ruta = _comm.ExecuteReader();
                            ruta.Read();
                            _ruta = ruta.GetString(0);

                            _conn.Close();
                            _conn.Dispose();
                            filePath = Path.Combine(Directory.GetCurrentDirectory(), "images", _ruta);
                        }
                        if (File.Exists(filePath))
                        {
                            ServeFile(request.Response, filePath);
                        }
                        else
                        {
                            Serve404(request.Response);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error al enviar las vistas");
                    }
                }
            }         
        }
        public static String QueryJson(String pQuery)
        {
            DataTable _t = new DataTable();
            var _conn = Conexion();
            var _comm = Comando(_conn);
            _conn.Open();
            _comm.CommandText = pQuery;
            IDataReader _reader = _comm.ExecuteReader();
            _t.Load(_reader);
            _conn.Close();
            _conn.Dispose();
            return JsonConvert.SerializeObject(_t);
        }
        public static void ServeJSON(HttpListenerResponse response, object data)
        {
            response.ContentType = "application/json";
            response.StatusCode = (int)HttpStatusCode.OK;
            using (StreamWriter writer = new StreamWriter(response.OutputStream, Encoding.UTF8))
            {
                string json = JsonConvert.SerializeObject(data);
                writer.Write(json);
                writer.Flush();
            }
        }
        private static void ServeFile(HttpListenerResponse response, string filePath)
        {
            try
            {
                byte[] buffer = File.ReadAllBytes(filePath);
                response.ContentType = GetContentType(filePath);
                response.ContentLength64 = buffer.Length;
                response.OutputStream.Write(buffer, 0, buffer.Length);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error serving file {filePath}: {ex.Message}");
                Serve500(response);
            }
            finally
            {
                response.OutputStream.Close();
            }
        }
        private static void ServeHTMLError(HttpListenerResponse response, String pHTML)
        {
            response.StatusCode = (int)HttpStatusCode.NotFound;
            byte[] buffer = Encoding.UTF8.GetBytes(String.Format("<span class='badge badge-danger'>{0}</span>", pHTML));
            response.ContentLength64 = buffer.Length;
            response.OutputStream.Write(buffer, 0, buffer.Length);
            response.OutputStream.Close();
        }
        private static void ServeHTML(HttpListenerResponse response, String pHTML)
        {
            try
            {
                response.StatusCode = (int)HttpStatusCode.OK;
                byte[] buffer = Encoding.UTF8.GetBytes(pHTML);
                response.ContentLength64 = buffer.Length;
                response.OutputStream.Write(buffer, 0, buffer.Length);
                response.OutputStream.Close();
            }
            catch (Exception ex)
            {

                Serve500(response);
            }
            finally
            {
                response.OutputStream.Close();
            }

        }

        private static void Serve404(HttpListenerResponse response)
        {
            response.StatusCode = (int)HttpStatusCode.NotFound;
            byte[] buffer = Encoding.UTF8.GetBytes("<html><body><h1>404 - Not Found</h1></body></html>");
            response.ContentLength64 = buffer.Length;
            response.OutputStream.Write(buffer, 0, buffer.Length);
            response.OutputStream.Close();
        }

        private static void Serve500(HttpListenerResponse response)
        {

            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            byte[] buffer = Encoding.UTF8.GetBytes("<html><body><h1>500 - Internal Server Error</h1></body></html>");
            response.ContentLength64 = buffer.Length;
            response.OutputStream.Write(buffer, 0, buffer.Length);
            response.OutputStream.Close();
        }

        public static bool StartsWith(byte[] fileBytes, byte[] signature)
        {
            if (fileBytes.Length < signature.Length)
            {
                return false;
            }

            for (int i = 0; i < signature.Length; i++)
            {
                if (fileBytes[i] != signature[i])
                {
                    return false;
                }
            }

            return true;
        }

        private static string GetContentType(string filePath)
        {
            string extension = Path.GetExtension(filePath).ToLower();
            String _retval = "";
            if (extension == ".html")
                _retval = "text/html";
            if (extension == ".css")
                _retval = "text/css";
            if (extension == ".js")
                _retval = "application/javascript";
            if (extension == ".png")
                _retval = "image/png";
            if (extension == ".jpg")
                _retval = "image/jpeg";
            if (extension == ".gif")
                _retval = "image/gif";
            if (extension == ".ico")
                _retval = "image/x-icon";
            if (extension == ".json")
                _retval = "application/json";
            if (extension == ".xml")
                _retval = "application/xml";
            if (extension == ".pdf")
                _retval = "application/pdf";

            return _retval;
        }
        public String TipoArch(byte[] fileBytes)
        {
            String t = "";

            // Las firmas mágicas de algunos formatos comunes
            byte[] pdfSignature = new byte[] { 0x25, 0x50, 0x44, 0x46 }; // %PDF
            byte[] jpgSignature = new byte[] { 0xFF, 0xD8, 0xFF }; // JPEG
            byte[] pngSignature = new byte[] { 0x89, 0x50, 0x4E, 0x47 }; // PNG
            byte[] gifSignature = new byte[] { 0x47, 0x49, 0x46, 0x38 }; // GIF

            if (StartsWith(fileBytes, pdfSignature))
            {
                return "PDF";
            }
            else if (StartsWith(fileBytes, jpgSignature))
            {
                return "JPEG";
            }
            else if (StartsWith(fileBytes, pngSignature))
            {
                return "PNG";
            }
            else if (StartsWith(fileBytes, gifSignature))
            {
                return "GIF";
            }
            else
            {
                return "Desconocido";
            }

            return t;
        }


        public static String MensajeError(String pMensaje)
        {
            return pMensaje;
        }

        static string LimpiarUrl(string url)
        {
            int index = url.IndexOf('?');
            if (index > -1)
            {
                return url.Substring(0, index);
            }
            return url;
        }
        public static String Sqldate(DateTime pfecha)
        {
            return pfecha.Year.ToString() + "-" + pfecha.Month.ToString().PadLeft(2, '0') + "-" + pfecha.Day.ToString().PadLeft(2, '0');
        }

        public static string Limpiar(string pFrase)
        {
            pFrase = pFrase.Replace("á", "(a)");
            pFrase = pFrase.Replace("é", "(e)");
            pFrase = pFrase.Replace("í", "(i)");
            pFrase = pFrase.Replace("ó", "(o)");
            pFrase = pFrase.Replace("ú", "(u)");
            pFrase = pFrase.Replace("ñ", "(n)");
            pFrase = pFrase.Replace("Ñ", "(N)");
            pFrase = pFrase.Replace("Á", "(A)");
            pFrase = pFrase.Replace("É", "(E)");
            pFrase = pFrase.Replace("Í", "(I)");
            pFrase = pFrase.Replace("Ó", "(O)");
            pFrase = pFrase.Replace("Ú", "(U)");
            pFrase = pFrase.Replace("<br>", "\n");
            return pFrase;
        }
        public static String DesLimpiar(String pDato)
        {
            pDato = pDato.Replace("(a)", "á");
            pDato = pDato.Replace("(e)", "é");
            pDato = pDato.Replace("(i)", "í");
            pDato = pDato.Replace("(o)", "ó");
            pDato = pDato.Replace("(u)", "ú");
            pDato = pDato.Replace("(n)", "ñ");
            pDato = pDato.Replace("(N)", "Ñ");
            pDato = pDato.Replace("(A)", "Á"); // Agregado
            pDato = pDato.Replace("(E)", "É"); // Agregado
            pDato = pDato.Replace("(I)", "Í"); // Agregado
            pDato = pDato.Replace("(O)", "Ó"); // Agregado
            pDato = pDato.Replace("(U)", "Ú"); // Agregado
            pDato = pDato.Replace("\n", "<br>");
            return pDato;
        }




        public static string GenerarListaTrabajos(DataTable pTabla)
        {
            string _retval = "";
            foreach (DataRow _r in pTabla.Rows)
            {
                // Asumiendo que las columnas de la tabla son: título, empresa, ubicación, salario mínimo y salario máximo
                string id = _r["id"].ToString();
                string titulo = _r["titulo"].ToString();        // Título del trabajo
                string empresa = _r["idempress"].ToString();      // Nombre de la empresa
               
                var _conn = Conexion();
                var _comm = Comando(_conn);

                _conn.Open();
                _comm.CommandText = String.Format("Select nombre from empleador where id = {0}", empresa);
                var empres = _comm.ExecuteReader();
                empres.Read();
                String _empress = "";
                _empress = empres.GetString(0);
                _conn.Close();
                _conn.Dispose();
                string ubicacion = _r["ubicacion"].ToString();  // Ubicación del trabajo
                string salarioMin = _r["pagomin"].ToString();// Salario mínimo
                string salarioMax = _r["pagomax"].ToString();// Salario máximo

                // Generar HTML para cada fila de trabajo
                _retval += String.Format(@"
            <div class='job-item'>
                <div class='job-title'>{0}</div>
                <div class='job-details'>Empresa: {1} | Ubicación: {2} | Salario: {3} - {4}</div>
                <div class='job-apply'><a class='btn btn-dark' onClick='modalshow({5})' >Aplicar Ahora</a></div>
            </div>
            ", titulo, _empress, ubicacion, salarioMin, salarioMax, id) + Environment.NewLine;
            }
            return _retval;
        }

        public static string GenerarListaTrabajosempleador(DataTable pTabla)
        {
            string _retval = "";
            foreach (DataRow _r in pTabla.Rows)
            {
                // Asumiendo que las columnas de la tabla son: título, empresa, ubicación, salario mínimo y salario máximo
                string id = _r["id"].ToString();
                string titulo = _r["titulo"].ToString();        // Título del trabajo
                string empresa = _r["idempress"].ToString();      // Nombre de la empresa
                var _conn = Conexion();
                var _comm = Comando(_conn);
                int contador = EjecutarConsulta(String.Format("select count(id) from aplicarofertas where idoferta = {0} and activa = '1'", id));
                string ubicacion = _r["ubicacion"].ToString();  // Ubicación del trabajo
                string salarioMin = _r["pagomin"].ToString();// Salario mínimo
                string salarioMax = _r["pagomax"].ToString();// Salario máximo
                DateTime desde = Convert.ToDateTime(_r["desde"].ToString());
                string plazas = _r["plazas"].ToString();
                // Generar HTML para cada fila de trabajo
                _retval += String.Format(@"          
              <div class='job-card-empleador' onClick='llenarcandidatos({7})'>
                    <h3>{0}</h3> <span># Aplicantes: {6}</span>
                <div class='job-details-empleador'>
                    <span>{1}</span>
                    <span>Salario: ${2} - ${3} </span>
                    <span>Plazas Disponibles: {4}</span>
                    <span>Fecha de Publicación: {5}</span>
                    
                </div>
                    <a class='btn btn-dark' onClick='modalshow({7})' >Ver Detalles</a>
              </div>
            ", titulo, ubicacion, salarioMin, salarioMax, plazas, desde.ToString("dd/MM/yyyy"), contador, id) + Environment.NewLine;
            }
            return _retval;
        }



        public static string GenerarListaEmpleadores(DataTable pTabla)
        {
            string _retval = "";
            foreach (DataRow _r in pTabla.Rows)
            {
                // Asumiendo que las columnas de la tabla son: título, empresa, ubicación, salario mínimo y salario máximo
                string id = _r["id"].ToString();
                string titulo = _r["nombre"].ToString();        // Título del trabajo
                string direccion = _r["direccion"].ToString();      // Nombre de la empresa
                string telefono = _r["telefono"].ToString();  // Ubicación del trabajo
                string correo = _r["correo"].ToString();// Salario mínimo
                string logo = _r["logoruta"].ToString();// Salario máximo

                int contador = EjecutarConsulta(String.Format("select count(id) from ofertasempleo where idempress = {0}", id));

                // Generar HTML para cada fila de trabajo
                _retval += String.Format(@"
             <div class='empresa-item'>  
             <div class='empresa-logo'>
             <img src='/image/logo/logo.jpg' alt='Logo Empresa' onerror ='this.src='Sin Logo''></div>           
             <div class='empresa-info'>
               <div class='empresa-nombre'>Nombre: {0}</div>
               <div class='empresa-direccion'>Dirección: {1}</div>
               <div class='empresa-correo'>Correo: {3}</div>
               <div class='empresa-correo'>Telefono: {2}</div>  
             </div>
              <div class='job-apply-empress'><button class='btn btn-dark' onClick='llenarofertas({5})'> Oportunidades({6}) </button></div>
             </div>
            ", titulo, direccion, telefono, correo, logo, id, contador) + Environment.NewLine;
            }
            return _retval;
        }
        public static string GenerarListaCandidatos(DataTable pTabla, int empresa)
        {
            string _retval = "";
            foreach (DataRow _r in pTabla.Rows)
            {
                // Asumiendo que las columnas de la tabla son: título, empresa, ubicación, salario mínimo y salario máximo
                string idusuario = _r["idcandidato"].ToString();
                string idoferta = _r["idoferta"].ToString();
                DateTime fechaaplico = Convert.ToDateTime(_r["fecha"].ToString());        // Título del trabajo
                string cv = _r["idcv"].ToString();      // Nombre de la empresa
                string activo = _r["activa"].ToString();  // Ubicación del trabajo
                int idempresa = empresa;
                string apellido = "";
                string nombre = "";
                string usuario = "";
                string titulo = "";
                string rutacv = "";
                String cons = String.Format(@"SELECT * FROM candidato where usuario = '{0}'", idusuario);
                DataTable dt = new DataTable();
                dt = Query(cons);
                foreach (DataRow _r2 in dt.Rows)
                {
                     apellido = _r2["apellido"].ToString();
                     nombre = _r2["nombre"].ToString();
                     usuario = _r2["usuario"].ToString();

                }
                String cons2 = String.Format(@"SELECT titulo FROM ofertasempleo where idempress = '{0}' and id = '{1}'", empresa, idoferta);
                DataTable dt2 = new DataTable();
                dt2 = Query(cons2);
                foreach (DataRow _r3 in dt2.Rows)
                {
                    titulo = _r3["titulo"].ToString();
                }

                String cons3 = String.Format(@"SELECT rutacv FROM cv_candidatos where usuario = '{0}'", idusuario);
                DataTable dt3 = new DataTable();
                dt3 = Query(cons3);
                foreach (DataRow _r3 in dt3.Rows)
                {
                    rutacv = _r3["rutacv"].ToString();
                }

                // Generar HTML para cada fila de trabajo
                _retval += String.Format(@"
        <div class='application-card-empleador'>
             <h3>{0} {1}</h3>  
           <div class='application-details-empleador'>
             <span>ID Candidato: {2}</span>           
             <span>Aplicó a: {3}</span>
             <span>Fecha de Aplicación: {4}</span>
             <span>CV: <a href='#'>Ver CV</a></span>
             <span>Estado: Activo</span>
           </div>
             <a href='#' class='btn btn-dark'>Ver Perfil</a>  
        </div>", nombre, apellido, usuario,  titulo, fechaaplico.ToString("dd/MM/yyyy"), rutacv, idusuario ) + Environment.NewLine;
            }
            return _retval;
        }

    }
}
