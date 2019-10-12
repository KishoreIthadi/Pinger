using System;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using PingerAPI.Enums;

namespace PingerAPI.Utilities
{
    public class EmailUtility
    {
        public static void SendEmail(string toMail, string subject, string body, IConfiguration configuration)
        {
            //try
            //{
            using (SmtpClient smtp = new SmtpClient())
            {
                smtp.Port = configuration.GetValue<int>("Smtp:Port");
                smtp.Host = configuration.GetValue<string>("Smtp:Host");
                smtp.Credentials = new NetworkCredential(configuration.GetValue<string>("Smtp:UserName"),
                                                         configuration.GetValue<string>("Smtp:Password"));
                smtp.EnableSsl = true;

                using (MailMessage message = new MailMessage())
                {
                    if (configuration.GetValue<bool>("Settings:IsProduction"))
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
                        string tempMail = configuration.GetValue<string>("Settings:TestMail");
                        foreach (var item in tempMail.Replace(" ", "").Split(','))
                        {
                            if (item != string.Empty)
                            {
                                message.To.Add(new MailAddress(item));
                            }
                        }
                    }

                    message.From = new MailAddress(configuration.GetValue<string>("Smtp:UserName"));
                    message.Subject = subject;
                    message.Body = body;
                    message.IsBodyHtml = true;

                    smtp.Send(message);

                    //return ValidationEnum.Success;
                }
            }
            //}
            //catch(Exception ex)
            //{
            //    return ValidationEnum.Failure;
            //}
        }
    }
}