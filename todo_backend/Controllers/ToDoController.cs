using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using todo_backend.Context;
using todo_backend.Models;

namespace todo_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController:ControllerBase
    {
        [HttpPost("addToDo")]
        public IActionResult AddToDo([FromBody] dynamic toDoElement)
        {
            var toDoObject = (JsonElement)toDoElement;
            ToDoModel toDo = new ToDoModel
            {
                ToDoName = toDoElement.GetProperty("toDoName").GetString(),
                ToDoDescription = toDoElement.GetProperty("description").GetString(),
            };
            using (var context = new ContextClass()) { 
                context.toDo.Add(toDo);
                context.SaveChanges();
            }
            return Ok("ToDo saved succesfully.");
        }
        [HttpPost("listToDo")]
        public IActionResult ListToDo([FromBody] dynamic toDoElement)
        {
            var toDoObject = (JsonElement)toDoElement;
            string username = toDoElement.GetProperty("username").GetString();
            List<ToDoModel> toDoList= new List<ToDoModel>();
            using (var context = new ContextClass())
            {
                var id= context.user.FirstOrDefault(x => x.UserName == username).Id;
                toDoList = context.toDo.Where(x => x.Id == id).ToList();
            }
            return Ok(toDoList);
        }
    }
}
