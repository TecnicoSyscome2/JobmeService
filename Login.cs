
using MySqlConnector;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace JobmeServiceSyscome
{
    public class Login
    {


        //Funciones de loggin
        public string body = "";
        public void HandleLogin(HttpListenerContext context)
        {

            string rootDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "vistas");
            string rootDirectorylogin = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "vistaslogin");
            string filePath = Path.Combine(rootDirectory, "Login/login.html");


            if (context.Request.HttpMethod == "POST" || context.Request.HttpMethod == "GET")
            {
                using (var reader = new StreamReader(context.Request.InputStream, context.Request.ContentEncoding))
                {

                    string requestBody = reader.ReadToEnd();
                    body = requestBody;
                    var queryParams = context.Request.QueryString;
                    string username = queryParams["username"];
                    string password = queryParams["password"];
                    string url5 = context.Request.Url.Query;
                    string url2 = context.Request.Url.PathAndQuery;
                    // if (ValidateUser(username, password))
                    if (ValidateUser(username, password))
                    {

                        // Crear una nueva sesión
                        string sessionId = SessionManager.CreateSession(username);

                        // Configurar la cookie de sesión
                        Cookie sessionCookie = new Cookie("sessionId", sessionId)
                        {
                            Expires = DateTime.Now.AddHours(8),
                            HttpOnly = true, // Hace que la cookie sea inaccesible desde el lado del cliente (JavaScript)
                            Path = "/"
                        };
                        context.Response.Cookies.Add(sessionCookie);

                        Program p = new Program();
                        context.Response.StatusCode = (int)HttpStatusCode.OK;
                        context.Response.ContentType = "text/html";
                        byte[] buffer = Encoding.UTF8.GetBytes("Inicio de sesion exitoso, Sesion creada.");
                        context.Response.OutputStream.Write(buffer, 0, buffer.Length);
                    }
                    else if (context.Request.Url.Query == "?logout")
                    {
                        HandleLogout(context);
                    }
                    else if (context.Request.Cookies["sessionId"] != null && !string.IsNullOrEmpty(context.Request.Cookies["sessionId"].Value))
                    {

                        HandleRequest(context);

                    }

                    //else
                    //{
                    //    // Maneja el caso donde la cookie no existe o su valor es nulo
                    //    // Por ejemplo, redirigir al usuario a una página de inicio de sesión
                    //}
                    else
                    {
                        // Login fallido
                        SendResponseLogin(context, rootDirectorylogin);
                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        context.Response.ContentType = "text/html";
                        byte[] buffer = Encoding.UTF8.GetBytes("Datos Invalidos, contraseña o usuario.");


                        context.Response.OutputStream.Write(buffer, 0, buffer.Length);

                    }

                }
                context.Response.OutputStream.Close();
            }

        }

        public void HandleLogout(HttpListenerContext context)
        {
            string rootDirectorylogin = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "vistaslogin");
            // Obtener la cookie de sesión
            string sessionId = context.Request.Cookies["sessionId"]?.Value;

            if (!string.IsNullOrEmpty(sessionId) && SessionManager.ValidateSession(sessionId))
            {
                // Eliminar la sesión del almacenamiento en memoria
                SessionManager.RemoveSession(sessionId);

                // Eliminar la cookie de sesión
                Cookie sessionCookie = new Cookie("sessionId", "")
                {
                    Expires = DateTime.Now.AddDays(-1), // Expira inmediatamente
                    HttpOnly = true,
                    Path = "/"
                };
                context.Response.Cookies.Add(sessionCookie);

                // Responder con un mensaje de éxito
                context.Response.StatusCode = (int)HttpStatusCode.OK;

                byte[] buffer = Encoding.UTF8.GetBytes("Se ah cerrado sesion exitosamente.");
                SendResponseLogin(context, rootDirectorylogin);
                context.Response.OutputStream.Write(buffer, 0, buffer.Length);
            }
            else
            {
                // Si no se encuentra la sesión, responde con un error
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                byte[] buffer = Encoding.UTF8.GetBytes("No hay una sesion activa.");
                context.Response.OutputStream.Write(buffer, 0, buffer.Length);
            }

            context.Response.OutputStream.Close();
        }

        public void HandleRequest(HttpListenerContext context)
        {
            // Obtener la cookie de sesión
            string sessionId = context.Request.Cookies["sessionId"]?.Value;
            string rootDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "vistas");
            string rootDirectorylogin = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "vistaslogin");
            if (sessionId != null && SessionManager.ValidateSession(sessionId))
            {
                // Sesión válida
                context.Response.StatusCode = (int)HttpStatusCode.OK;
                context.Response.ContentType = "text/html";
                Program p = new Program();
                if (context.Request.HttpMethod == "POST")
                {
                    SendResponsePost(context, rootDirectory);
                }
                else
                {
                    p.SendResponse(context, rootDirectory);
                }
                byte[] buffer = Encoding.UTF8.GetBytes("La sesion es valida, Bienvenido");
                context.Response.OutputStream.Write(buffer, 0, buffer.Length);
            }
            else
            {
                // Sesión inválida o no existe
                SendResponseLogin(context, rootDirectorylogin);
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                context.Response.ContentType = "text/html";
                byte[] buffer = Encoding.UTF8.GetBytes("Upss, la sesion ah expirado.");
                context.Response.OutputStream.Write(buffer, 0, buffer.Length);
            }
            context.Response.OutputStream.Close();
        }

        private static bool ValidateUser(string username, string password)
        {
            bool isValid = false;

            if (File.Exists("conn.ini") == false)
            {
                File.WriteAllText("conn.ini", "Server=LOCALhost;Database=myplan_jobpost;Uid=root;Pwd=230680");
            }
            String _connstring = File.ReadAllText("conn.ini");
            using (var connection = new MySqlConnection(_connstring))
            {
               
                    connection.Open();
                    string query = "SELECT COUNT(*) FROM empleador WHERE usuario = @username AND clave = @password";

                    using (var command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@username", username);
                        command.Parameters.AddWithValue("@password", password); // Asegúrate de manejar el hash de la contraseña en producción

                        var result = Convert.ToInt32(command.ExecuteScalar());
                        isValid = result > 0;
                    }
                

            }

            return isValid;
        }

        public void SendResponsePost(HttpListenerContext request, string rootdirectory)
        {

            try
            {

                Program _c = new Program();




                JObject json = JObject.Parse(body);
                String _insert = "";
                string _q = (string)json["q"];
                if (_q == "guardarImagenes")
                {

                    bool b = false;
                    String msj = "Error";
                    String imgdataexist = (string)json["img"];
                    string _nombre = (string)json["nombre"];
                    string _apellido = (string)json["apellido"];
                    String _codempl = (string)json["codempl"]; ;
                    String imagen = (string)json["img"];
                    String dui = (string)json["dui"]; ;
                    if (!string.IsNullOrEmpty(imgdataexist))
                    {

                        _nombre = _nombre + "-" + _apellido;

                        string directorioBase = Path.Combine(Environment.CurrentDirectory, "images");
                        //La direccion de abajo es la ruta de pruebas local (Josue Lopez)
                        //String directorioBase = Path.Combine("C:\\", "Users", "PC", "Documents", "Github", "BancoopreEstandar", "BancoopreWeb00", "Imagenes", "MaeascoDui");
                        if (!Directory.Exists(directorioBase))
                        {
                            Directory.CreateDirectory(directorioBase);
                        }

                        byte[] imageBytes = Convert.FromBase64String(imagen);
                        string fileType = _c.TipoArch(imageBytes);
                        String ext = fileType == "PDF" ? ".pdf" : ".png";
                        //File.WriteAllBytes(directorioBase, imageBytes);
                        String ruta = _codempl + "_N-" + _nombre + "_D-" + dui + ext;
                        File.WriteAllBytes(Path.Combine(directorioBase + "\\" + _codempl + "_N-" + _nombre + "_D-" + dui + ext), imageBytes);
                        _insert = String.Format("insert into emplimg(codempl , nombre, ruta) values('{0}', '{1}', '{2}')",
                             _codempl, _nombre, ruta);
                        var _conn = _c.Conexion3();
                        var _comm = _c.Comando3(_conn);
                        _conn.Open();
                        _comm.CommandText = String.Format("delete from emplimg where codempl = {0}", _codempl);

                        _comm.ExecuteNonQuery();
                        _conn.Close();
                        _conn.Dispose();



                        _conn.Open();
                        _comm.CommandText = _insert;
                        try
                        {
                            _comm.ExecuteNonQuery();
                        }
                        catch (Exception ex)
                        {
                            //ServeHTMLError(request.Response, ex.Message);
                            Console.WriteLine("Error al guardar la imagen: " + ex.Message);
                            b = false;
                        }
                        finally
                        {
                            b = true;
                            _conn.Close();
                            _conn.Dispose();
                        }
                    }

                    if (b)
                    {

                        if (b == false)
                        {
                            var _conn = _c.Conexion3();
                            var _comm = _c.Comando3(_conn);
                            _conn.Open();
                            _comm.CommandText = String.Format("delete from emplimg where codempl = {0}", _codempl);
                            _comm.ExecuteNonQuery();
                            _conn.Close();
                            _conn.Dispose();
                        }

                    }
                }
                else if (_q == "GenerarExcelPlanillaUnica")
                {
                    String jsonlista = (string)json["jsonlista"];
                    String anio = (string)json["pAnio"];
                    String mes = (string)json["pMes"];
                    String tipopla = (string)json["pTipoPlanif"];
                    DataTable dt = JsonConvert.DeserializeObject<DataTable>(jsonlista);
                    String nombrearchivo = "PlanillaUnica_" + tipopla + "_" + anio + " - " + mes + ".xls";
                    String excelFilePath = Path.Combine(Environment.CurrentDirectory, "reportesexcel/" + nombrearchivo);
                    String base64arch = "";

                    try
                    {
                        File.WriteAllText(excelFilePath, TablaHTMLExcel(dt));
                        byte[] bytesarch = File.ReadAllBytes(excelFilePath);
                        base64arch = Convert.ToBase64String(bytesarch);


                    }
                    catch (Exception)
                    {
                    }


                    var obJSON = new
                    {
                        nombrearch = nombrearchivo,
                        archivo = base64arch
                    };
                    String jsonResp = JsonConvert.SerializeObject(obJSON);
                    ServerFileConJSON(request.Response, jsonResp);


                }


                // }
                // }
            }
            catch (Exception ex)
            {
                // ServeHTMLError(request.Response, "Error");
                Console.WriteLine("Error al guardar foto: " + ex.Message);
            }
        }


        public void SendResponseLogin(HttpListenerContext request, string rootDirectory)
        {
            string url = request.Request.Url.AbsolutePath.Trim('/');
            string url2 = request.Request.Url.PathAndQuery;
            string url3 = request.Request.Url.Query;
            string url4 = "/index";
            // HandleLogin(request, rootDirectory);

            var query = request.Request.QueryString;
            string filePath = Path.Combine(rootDirectory, url);
            var requestType = request.Request.HttpMethod;
            // HandleLogin(request, rootDirectory);
            var queryParams = request.Request.QueryString;
            string username = query["username"];
            string password = query["password"];
            if (request.Response.StatusCode == (int)HttpStatusCode.Unauthorized)
            {
                request.Response.ContentType = "text/html";
                string script = "<script>alert('¡Upss, Al parecer su usuario y contraseña no es valido!');</script>";
                byte[] buffer = Encoding.UTF8.GetBytes(script);
                request.Response.OutputStream.Write(buffer, 0, buffer.Length);

                request.Response.Close();
            }
            if (requestType.Equals("POST", StringComparison.OrdinalIgnoreCase))
            {
                try
                {


                    if (url4 == "/index")
                    {
                        filePath = Path.Combine(rootDirectory, "index.html");
                    }
                    if (url == "/loginempleador")
                    {
                        filePath = Path.Combine(rootDirectory, "loginempleador.html");
                    }
                    if (url == "/logincandidato")
                    {
                        filePath = Path.Combine(rootDirectory, "logincandidato.html");
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
            if (requestType.Equals("GET", StringComparison.OrdinalIgnoreCase))
            {
                try
                {


                    if (string.IsNullOrEmpty(url) || url == "/")
                    {

                        filePath = Path.Combine(rootDirectory, "index.html");

                    }
                    if (url == "loginempleadores")
                    {
                        filePath = Path.Combine(rootDirectory, "loginempleadores.html");
                    }
                    if (url == "logincandidatos")
                    {
                        filePath = Path.Combine(rootDirectory, "logincandidatos.html");
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


        private static void ServerFileConJSON(HttpListenerResponse response, string json)
        {

            try
            {
                byte[] buffer = Encoding.UTF8.GetBytes(json);
                response.ContentType = "application/json";
                response.ContentLength64 = buffer.Length;
                response.OutputStream.Write(buffer, 0, buffer.Length);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error : {ex.Message}");
                Serve500(response);
            }
            finally
            {
                response.OutputStream.Close();
            }
        }


        private static string GetContentType(string filePath)
        {
            // Determina el tipo de contenido en función de la extensión del archivo
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

        private static void Serve500(HttpListenerResponse response)
        {
            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            byte[] buffer = Encoding.UTF8.GetBytes("500 Internal Server Error");
            response.OutputStream.Write(buffer, 0, buffer.Length);
            response.OutputStream.Close();
        }
        private static void Serve404(HttpListenerResponse response)
        {
            response.StatusCode = (int)HttpStatusCode.NotFound;
            byte[] buffer = Encoding.UTF8.GetBytes("<html><body><h1>404 - Not Found</h1></body></html>");
            response.ContentLength64 = buffer.Length;
            response.OutputStream.Write(buffer, 0, buffer.Length);
            response.OutputStream.Close();
        }





        public static String TablaHTMLExcel(DataTable pTabla)
        {
            String _retval = "<table>";

            _retval += "<tr>";
            for (Int32 ti = 0; ti < pTabla.Columns.Count; ti++)
            {
                _retval += String.Format("<th><b>{0}</b></th>", pTabla.Columns[ti].ColumnName.ToUpper());

            }

            _retval += "</tr>" + System.Environment.NewLine;

            foreach (DataRow _r in pTabla.Rows)
            {
                _retval += "<tr>";
                for (Int32 ti = 0; ti < pTabla.Columns.Count; ti++)
                {
                    if (pTabla.Columns[ti].DataType == typeof(String))
                    {
                        _retval += String.Format("<td style=\"mso-number-format:\\@;\">{0}</td>", " " + _r[ti].ToString());
                    }
                    else
                    {
                        _retval += String.Format("<td>{0}</td>", _r[ti].ToString());
                    }


                }

                _retval += "</tr>" + System.Environment.NewLine;
            }
            _retval += "</table>";
            return _retval;
        }




    }
}
