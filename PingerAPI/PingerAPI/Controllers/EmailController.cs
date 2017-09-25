using DomainModel;
using DomainModel.DTO;
using DomainModel.Email;
using DomainModel.Enum;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace PingerAPI.Controllers
{
    public class EmailController : ApiController
    {
        [HttpPost]
        public void SendEmail(List<TaskDTO> list)
        {
            Task.Run(() => PrepareEmail(list));
        }

        private void PrepareEmail(List<TaskDTO> emaillist)
        {
            foreach (var item in emaillist)
            {
                if (item.ToEmail != string.Empty)
                {
                    string status = StringLiterals.StatusAlive;

                    if (item.PreviousState == (int)TaskStatusEnum.Dead)
                    {
                        status = StringLiterals.StatusDead;
                    }

                    string subject = string.Format(StringLiterals.EmailSubject, item.Value, status, DateTime.UtcNow.ToString());

                    Task.Run(() => EmailUtility.SendEmail(item.ToEmail, subject, StringLiterals.EmailBody));
                }
            }
        }
    }
}