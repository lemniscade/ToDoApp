using Microsoft.EntityFrameworkCore;
using System;
using todo_backend.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()  // Herhangi bir kaynaktan istek kabul eder
              .AllowAnyMethod()  // Herhangi bir HTTP metoduna izin verir (GET, POST, PUT, DELETE vb.)
              .AllowAnyHeader(); // Herhangi bir header'a izin verir
    });
});


// DbContext'i kaydet
builder.Services.AddDbContext<ContextClass>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
var app = builder.Build();
app.UseCors("AllowAllOrigins");
app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller}/{action}/{id?}");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
