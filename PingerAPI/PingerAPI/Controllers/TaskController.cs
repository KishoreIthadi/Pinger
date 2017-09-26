using DomainModel.DTO;
using DomainModel.Enum;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace PingerAPI.Controllers
{
    public class TaskController : ApiController
    {
        [HttpPost]
        public async Task<List<TaskDTO>> CheckTaskStatus(List<TaskDTO> list)
        {
            foreach (var item in list)
            {
                switch (item.TaskType)
                {
                    case (int)TaskTypeEnum.WebSite:
                        await CheckWebsiteStatus(item);
                        break;
                    case (int)TaskTypeEnum.Server:
                        await CheckServerStatus(item);
                        break;
                    case (int)TaskTypeEnum.Database:
                        await CheckDBStatus(item);
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
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create((obj.Value.IndexOf("://") == -1) ?
                              "http://" + obj.Value : obj.Value);

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
            catch
            {
            }

            if (obj.PreviousState != (int)TaskStatusEnum.Dead)
            {
                obj.UpdatedState = (int)TaskStatusEnum.Dead;
            }

            return true;
        }

        private async Task<bool> CheckServerStatus(TaskDTO obj)
        {
            //TODO
            return true;
        }

        private async Task<bool> CheckDBStatus(TaskDTO obj)
        {
            //TODO
            return true;
        }
    }
}