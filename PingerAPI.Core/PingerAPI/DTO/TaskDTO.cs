namespace PingerAPI.DTO
{
    public class TaskDTO
    {
        public int TaskType { get; set; }
        public string Entity { get; set; }
        public int PreviousState { get; set; }
        public int UpdatedState { get; set; }
        public string ToEmail { get; set; }
        public string Key { get; set; }
    }
}