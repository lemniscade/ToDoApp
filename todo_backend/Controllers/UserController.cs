using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics.Eventing.Reader;
using todo_backend.Context;
using todo_backend.Models;

namespace todo_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController: ControllerBase
    {
        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] UserModel userObject)
        {
            UserModel user = new UserModel{
                UserName = userObject.UserName,
                Password = userObject.Password,
            };
            using (var context = new ContextClass())
            {
                var userVariable=context.user.FirstOrDefault(x => x.UserName == userObject.UserName);
                if (userVariable == null)
                {
                    context.user.Add(user);
                    context.SaveChanges();
                    return CreatedAtAction(nameof(RegisterUser), userObject);
                }
                else
                {
                    return Conflict("A user with the same username already exists.");
                }
            }
        }
    }
}
