using Microsoft.EntityFrameworkCore;
using PizzaApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. РЕЄСТРАЦІЯ БАЗИ ДАНИХ (Автоматичне визначення шляху)
// Це змусить додаток шукати файл pizza.db прямо в тій папці, де виконується програма
string dbPath = Path.Combine(AppContext.BaseDirectory, "pizza.db");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

// 2. НАЛАШТУВАННЯ CORS (щоб React міг брати дані з сервера)
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 3. ДОЗВОЛЯЄМО СЕРВЕРУ ВІДДАВАТИ КАРТИНКИ (з папки wwwroot)
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 4. ПІДКЛЮЧАЄМО CORS
app.UseCors();

app.UseAuthorization();
app.MapControllers();

app.Run();