using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PingerAPI.DTO;
using PingerAPI.Enums;
using System.Net;
using System.Net.Sockets;
using System;
using Microsoft.Extensions.Logging;

namespace PingerAPI.Controllers
{
    [Route("api/Task")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ILogger<TaskController> _logger;

        public TaskController(ILogger<TaskController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public string Get()
        {
            return "Success";
        }

        [HttpPost]
        [Route("CheckTaskStatus")]
        public async Task<List<TaskDTO>> CheckTaskStatus([FromBody]List<TaskDTO> list)
        {
            foreach (var item in list)
            {
                switch (item.TaskType)
                {
                    case (int)TaskTypeEnum.WebSite:
                        await CheckWebsiteStatus(item);
                        break;
                    case (int)TaskTypeEnum.Server:
                        await CheckServerNDBStatus(item);
                        break;
                    case (int)TaskTypeEnum.Database:
                        await CheckServerNDBStatus(item);
                        break;
                    default:
                        break;
                }
            }

            return list;
        }

        private async Task<bool> CheckWebsiteStatus(TaskDTO obj)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create((obj.Entity.IndexOf("://") == -1) ?
                              "http://" + obj.Entity : obj.Entity);

                using (HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync())
                {
                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        if (obj.PreviousState != (int)TaskStatusEnum.Alive)
                        {
                            obj.UpdatedState = (int)TaskStatusEnum.Alive;
                        }
                    }
                }

                return true;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message + ex.StackTrace);
            }

            if (obj.PreviousState != (int)TaskStatusEnum.Dead)
            {
                obj.UpdatedState = (int)TaskStatusEnum.Dead;
            }

            return true;
        }

        private async Task<bool> CheckServerNDBStatus(TaskDTO obj)
        {
            try
            {
                string[] list = obj.Entity.Split(':');

                TcpClient client = new TcpClient();
                await client.ConnectAsync(list[0], Convert.ToInt32(list[1]));

                if (obj.PreviousState != (int)TaskStatusEnum.Alive)
                {
                    obj.UpdatedState = (int)TaskStatusEnum.Alive;
                }

                return true;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message + ex.StackTrace);
            }

            if (obj.PreviousState != (int)TaskStatusEnum.Dead)
            {
                obj.UpdatedState = (int)TaskStatusEnum.Dead;
            }

            return true;
        }
    }
}
