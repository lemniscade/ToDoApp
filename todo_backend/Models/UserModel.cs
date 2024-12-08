namespace todo_backend.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }

        public string Password { get; set; }

        public List<ToDoModel>? ToDo { get; set; }
    }
}
