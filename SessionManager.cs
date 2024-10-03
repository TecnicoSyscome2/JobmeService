using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobmeServiceSyscome
{
    public class SessionManager
    {
        private static Dictionary<string, (DateTime Expiration, string Username)> sessions = new Dictionary<string, (DateTime, string)>();
        private static TimeSpan sessionDuration = TimeSpan.FromHours(8);

        public static string CreateSession(string username)
        {
            string sessionId = Guid.NewGuid().ToString(); // Genera un ID de sesión único
            DateTime expiration = DateTime.Now.Add(sessionDuration);
            sessions[sessionId] = (expiration, username);
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
    }
}
