using System.Text;

namespace VideoSharing.Utils
{
    public class PasswordHelper
    {
        public static string HashPassword(string pwd)
        {
            if (string.IsNullOrEmpty(pwd)) return "";

            var bytes = new UTF8Encoding().GetBytes(pwd);
            var hashBytes = System.Security.Cryptography.MD5.Create().ComputeHash(bytes);
            return Convert.ToBase64String(hashBytes);
        }
    }
}
