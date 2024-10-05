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
using System.IO;
using System.Data;
using Newtonsoft.Json;
using System.Net.Mail;
using System.Text;
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
                File.WriteAllText("conn.ini", "Server=localhost;Database=myplan_jobpost;Uid=root;Pwd=230680");
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

        //public static SqlConnection Conexion2()
        //{
        //    SqlConnection _conexion = new SqlConnection();

        //    //OdbcConnection _conexion = new OdbcConnection("DSN=ContpreRemoto;");

        //    using (StreamReader _reader = File.OpenText("conn.inf"))
        //    {
        //        _conexion.ConnectionString = _reader.ReadLine();
        //    }

        //    return _conexion;
        //}

        ////public static IDbCommand Comando2()
        ////{
        ////    SqlCommand _commando = new SqlCommand();
        ////    //OdbcCommand _commando = new OdbcCommand();
        ////    return _commando;
        ////}
        //public static SqlCommand Comando2(SqlConnection pConn)
        //{
        //    SqlCommand _commando = new SqlCommand();
        //    _commando.Connection = pConn;
        //    //OdbcCommand _commando = new OdbcCommand();
        //    return _commando;
        //}


        //public static bool Ejecutar(String pquery)
        //{
        //    SqlConnection _conn = Conexion2();
        //    SqlCommand _comm = Comando2(_conn);
        //    try
        //    {
        //        _conn.Open();
        //        DataTable _t = new DataTable();
        //        _comm.CommandText = pquery;
        //        _comm.ExecuteNonQuery();
        //        _conn.Close();

        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        return false;
        //    }

        //}


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


                //HttpListenerRequest request = context.Request;
                //HttpListenerResponse response = context.Response;
                //if (request.HttpMethod == "POST")
                //{
                //    ReceiveAndSaveImage(request, response, "C:\\Users\\tecni\\source\\repos\\Planpre2024\\images");
                //}
                //else
                //{
                try
                {



                    login.HandleLogin(context);

                    //  SendResponse(context, rootDirectory);
                    //SendResponse(context, rootDirectory);

                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error");
                }
            }
        }


        public void SendResponse(HttpListenerContext request, string rootDirectory)
        {
            string url = request.Request.Url.AbsolutePath.Trim('/');
            string url2 = request.Request.Url.PathAndQuery;
            string url3 = request.Request.Url.Query;
            LimpiarUrl(url3);
            // HandleLogin(request, rootDirectory);

            var query = request.Request.QueryString;
            string filePath = Path.Combine(rootDirectory, url);
            var requestType = request.Request.HttpMethod;


            // HandleLogin(request, rootDirectory);
            var queryParams = request.Request.QueryString;
            string username = query["username"];
            string password = query["password"];


            if (query.Count >= 2 && requestType.Equals("GET", StringComparison.OrdinalIgnoreCase))
            {
                try
                {
                    String _verif = query["verif"];
                    if (_verif != "scm64")
                    {
                        ServeHTMLError(request.Response, "Acceso Denegado");

                    }
                    else
                    {
                        String _q = query["q"];
                        if (_q == "agregar")
                        {
                            DataTable t = JsonConvert.DeserializeObject<DataTable>(query["datos"]);

                            try
                            {
                                DataTable _t = t;

                                String _tabla = query["tabla"];
                                String _insert = "replace into " + _tabla + " set ";
                                Int32 _llevo = 0;
                                foreach (DataRow _r in _t.Rows)
                                {
                                    _llevo++;
                                    if (_llevo > 1)
                                        _insert += ", ";
                                    _insert += String.Format("{0} = '{1}'", _r[0], _r[1]);
                                }
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
                                    ServeHTMLError(request.Response, ex.Message);
                                }
                                finally
                                {
                                    _conn.Close();
                                    _conn.Dispose();
                                    ServeHTML(request.Response, "<span id='miSpan' class='badge badge-success'>Registro Guardado Con éxito</span>");
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

                            //Query(String.Format("delete from {0} where {1} = '{2}' ",
                            //    _tabla, _codigo, _descrip));


                            ServeHTML(request.Response, "<span class='badge badge-success'>Registro Eliminado Con Exito</span>");
                        }

                        else 
                        if (_q == "listaofertasempleo")
                        {

                            String empresa = query["empresa"];
                            String nombre = query["nombre"];
                            //String ubicacion = query["ubicacion"];
                            //String pagodesde = query["pagodesde"];
                            //String pagohasta = query["pagohasta"];
                           
                            String cons = String.Format(@"SELECT * FROM ofertasempleo"
                            );
                            DataTable dt = new DataTable();
                            dt = Query(cons);
                            String Html = GenerarListaTrabajos(dt);

                            ServeHTML(request.Response, Html);

                        }


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


                    ////if (ValidateUser(username, password))
                    ////{
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
        public static String DesLimpiar(String pDato)
        {
            pDato = pDato.Replace("(a)", "á");
            pDato = pDato.Replace("(e)", "é");
            pDato = pDato.Replace("(i)", "í");
            pDato = pDato.Replace("(o)", "ó");
            pDato = pDato.Replace("(u)", "ú");
            pDato = pDato.Replace("(n)", "ñ");
            pDato = pDato.Replace("(N)", "Ñ");
            return pDato;
        }



        public static string GenerarListaTrabajos(DataTable pTabla)
        {
            string _retval = "";
            foreach (DataRow _r in pTabla.Rows)
            {
                // Asumiendo que las columnas de la tabla son: título, empresa, ubicación, salario mínimo y salario máximo
                string titulo = _r["titulo"].ToString();        // Título del trabajo
                string empresa = _r["empresa"].ToString();      // Nombre de la empresa
                string ubicacion = _r["ubicacion"].ToString();  // Ubicación del trabajo
                string salarioMin = _r["pagomin"].ToString();// Salario mínimo
                string salarioMax = _r["pagomax"].ToString();// Salario máximo

                // Generar HTML para cada fila de trabajo
                _retval += String.Format(@"
            <div class='job-item'>
                <div class='job-title'>{0}</div>
                <div class='job-details'>Empresa: {1} | Ubicación: {2} | Salario: {3} - {4}</div>
                <div class='job-apply'><a href='#'>Aplicar</a></div>
            </div>
            ", titulo, empresa, ubicacion, salarioMin, salarioMax) + Environment.NewLine;
            }
            return _retval;
        }

    }
}
