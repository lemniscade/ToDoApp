using Microsoft.EntityFrameworkCore;
using System;
using todo_backend.Models;

namespace todo_backend.Context
{
    public class ContextClass:DbContext
    {
        public ContextClass()
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-OIVAHGF\\SQLEXPRESS;Initial Catalog=ToDoReact;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False");
            }
        }

        public ContextClass(DbContextOptions<ContextClass> options) : base(options) { }
        public DbSet<ToDoModel> toDo { get; set; }
        public DbSet<UserModel> user { get; set; }
    }
}
