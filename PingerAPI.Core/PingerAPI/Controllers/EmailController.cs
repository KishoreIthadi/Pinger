using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PingerAPI.DTO;
using PingerAPI.Utilities;
using PingerAPI.Enums;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace PingerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private IConfiguration _configuration { get; }
        private readonly ILogger<EmailController> _logger;

        public EmailController(IConfiguration configuration,
            ILogger<EmailController> logger)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("SendEmail")]
        public void SendEmail([FromBody]List<TaskDTO> list)
        {
            Task.Run(() => PrepareEmail(list));
        }

        private void PrepareEmail(List<TaskDTO> emaillist)
        {
            try
            {
                foreach (var item in emaillist)
                {
                    if (item.ToEmail != string.Empty)
                    {
                        string status = StringUtility.StatusAlive;

                        if (item.PreviousState == (int)TaskStatusEnum.Dead)
                        {
                            status = StringUtility.StatusDead;
                        }

                        string subject = string.Format(StringUtility.EmailSubject, item.Entity, status, DateTime.UtcNow.ToString());

                        Task.Run(() =>
                        {
                             EmailUtility.SendEmail(item.ToEmail, subject, StringUtility.EmailBody, _configuration);
                        });
                    }
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message + ex.StackTrace);
            }
        }
    }
}
