using Microsoft.EntityFrameworkCore;
using PizzaApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Підключення PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// CORS для React
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Статичні файли
app.UseStaticFiles();

// CORS
app.UseCors();

app.UseAuthorization();

// Controllers
app.MapControllers();

// Тестовий endpoint
app.MapGet("/", () => "Pizza API is working!");

app.Run();