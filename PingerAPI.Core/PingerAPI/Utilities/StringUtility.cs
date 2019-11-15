  namespace PingerAPI.Utilities
{
    public class StringUtility
    {
         public static string EmailBody
        {
            get { return "Dear User,<br><br> Thank you for using Pinger!<br><br>"; }
        }

        public static string EmailSubject
        {
            get { return "Pinger Status : {0} {1} : {2} UTC"; }
        }

        public static string StatusAlive
        {
            get { return "Is UP & Running"; }
        }

        public static string StatusDead
        {
            get { return "Went Down"; }
        }
    }
}