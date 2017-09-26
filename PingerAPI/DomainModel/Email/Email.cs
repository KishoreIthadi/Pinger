using DomainModel.Enum;
using System;
using System.Configuration;
using System.Net.Mail;

namespace DomainModel.Email
{
    public class EmailUtility
    {
        public static ValidationEnum SendEmail(string toMail, string subject, string body)
        {
            try
            {
                using (SmtpClient smtp = new SmtpClient())
                {
                    using (MailMessage message = new MailMessage())
                    {
                        if (Convert.ToBoolean(ConfigurationManager.AppSettings["IsProduction"]))
                        {
                            foreach (var item in toMail.Replace(" ", "").Split(','))
                            {
                                if (item != string.Empty)
                                {
                                    message.To.Add(new MailAddress(item));
                                }
                            }
                        }
                        else
                        {
                            string tempMail = ConfigurationManager.AppSettings["TestMail"].ToString();
                            foreach (var item in tempMail.Replace(" ", "").Split(','))
                            {
                                if (item != string.Empty)
                                {
                                    message.To.Add(new MailAddress(item));
                                }
                            }
                        }

                        message.Subject = subject;
                        message.Body = body;
                        message.IsBodyHtml = true;

                        smtp.Send(message);

                        return ValidationEnum.Success;
                    }
                }
            }
            catch(Exception ex)
            {
                return ValidationEnum.Failure;
            }
        }
    }
}