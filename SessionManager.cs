using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobmeServiceSyscome
{
    public class SessionManager
    {
        private static Dictionary<string, (DateTime Expiration, string Username, string Empresa, string Tipouser,string Verif)> sessions = new Dictionary<string, (DateTime, string, string, string, string)>();
        private static TimeSpan sessionDuration = TimeSpan.FromHours(8);
        public static string CreateSession(string username, string empresa, string tipouser, string verif)
        {
            string sessionId = Guid.NewGuid().ToString(); // Genera un ID de sesión único
            DateTime expiration = DateTime.Now.Add(sessionDuration);
            sessions[sessionId] = (expiration, username, empresa, tipouser, verif); // Agrega la empresa a la sesión
            return sessionId;
        }
        public static bool ValidateSession(string sessionId)
        {
            if (sessions.ContainsKey(sessionId))
            {
                var sessionData = sessions[sessionId];
                if (sessionData.Expiration > DateTime.Now)
                {
                    // Sesión válida
                    return true;
                }
                else
                {
                    // Sesión expirada
                    sessions.Remove(sessionId);
                }
            }
            return false;
        }
        public static void RemoveSession(string sessionId)
        {
            if (sessions.ContainsKey(sessionId))
            {
                sessions.Remove(sessionId);
            }
        }
        public static (bool IsValid, string Username, string Empresa, DateTime Expiration, string Tipouser, string Verif) GetSession(string sessionId)
        {
            // Verifica si el token existe en el diccionario
            if (sessions.TryGetValue(sessionId, out var sessionData))
            {
                // Verifica si la sesión ha expirado
                if (sessionData.Expiration > DateTime.Now)
                {
                    // Si es válida, devuelve los datos
                    return (true, sessionData.Username, sessionData.Empresa, sessionData.Expiration, sessionData.Tipouser, sessionData.Verif);
                }
                else
                {
                    // Si la sesión ha expirado, la eliminas del diccionario
                    sessions.Remove(sessionId);
                }
            }

            // Si el token no es válido o ha expirado, devuelve valores por defecto
            return (false, null, null, DateTime.MinValue, null, null);
        }
    }
}
