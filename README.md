# Pizza API

Backend-частина курсового проєкту інтернет-магазину піци.

Проєкт складається з React frontend та backend на **C# ASP.NET Core Web API**. Для зберігання даних використовується **PostgreSQL**, взаємодія з базою виконується через **Entity Framework Core**, а запуск backend та бази даних організований за допомогою **Docker**.

## Технології

- C#
- ASP.NET Core 8
- Entity Framework Core
- PostgreSQL 16
- Npgsql
- Docker
- Docker Compose
- Swagger
- REST API
- React frontend

## Архітектура проєкту

Основний принцип роботи:

```text
React
  ↓
Axios / HTTP-запити
  ↓
ASP.NET Core Web API
  ↓
PizzasController
  ↓
Entity Framework Core
  ↓
PostgreSQL
```

Frontend відправляє HTTP-запит до backend. Контролер приймає запит та через `AppDbContext` звертається до PostgreSQL.

---

# 1. Модель Pizza

Файл `Models/Pizza.cs` описує структуру об'єкта піци та відповідної таблиці в базі даних.

```csharp
public class Pizza
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Text { get; set; }
    public int Price { get; set; }
    public string Image { get; set; }

    public int CategoryId { get; set; }
    public bool IsSpicy { get; set; }
    public bool IsVegetarian { get; set; }
    public int DoughType { get; set; }
}
```

### Основні поля:

- `Id` — унікальний ідентифікатор піци.
- `Title` — назва.
- `Text` — опис та склад.
- `Price` — ціна.
- `Image` — шлях до зображення.
- `CategoryId` — категорія піци.
- `IsSpicy` — чи є піца гострою.
- `IsVegetarian` — чи є піца вегетаріанською.
- `DoughType` — тип тіста.

Ця модель використовується Entity Framework Core для створення та роботи з таблицею `Pizzas`.

---

# 2. Підключення Entity Framework Core до PostgreSQL

Файл `Program.cs` відповідає за конфігурацію та запуск ASP.NET Core застосунку.

Основне підключення бази даних:

```csharp
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));
```

`UseNpgsql()` підключає Entity Framework Core до PostgreSQL за допомогою провайдера Npgsql.

Таким чином, backend може виконувати операції з PostgreSQL через C#-код без необхідності вручну писати SQL для кожної операції.

---

# 3. Рядок підключення до PostgreSQL

У `appsettings.json` зберігається connection string:

```json
"ConnectionStrings": {
    "DefaultConnection":
    "Host=localhost;Port=5432;Database=pizza_db;Username=postgres;Password=1234"
}
```

Він містить:

- `Host` — адреса PostgreSQL;
- `Port` — порт PostgreSQL;
- `Database` — назва бази даних;
- `Username` — користувач PostgreSQL;
- `Password` — пароль.

Для Docker backend connection string може передаватися через змінну середовища:

```text
ConnectionStrings__DefaultConnection
```

Це дозволяє використовувати різні налаштування для локального запуску та запуску в контейнерах.

---

# 4. AppDbContext

Файл `Models/AppDbContext.cs` є основним класом для роботи Entity Framework Core з базою даних.

```csharp
public class AppDbContext : DbContext
{
    public AppDbContext(
        DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Pizza> Pizzas { get; set; }
}
```

`DbSet<Pizza>` представляє таблицю `Pizzas` у PostgreSQL.

Через `_context.Pizzas` контролер може:

- отримувати записи;
- додавати записи;
- змінювати записи;
- видаляти записи.

---

# 5. Початкові дані

У `AppDbContext` використовується `HasData()` для додавання початкових піц:

```csharp
modelBuilder.Entity<Pizza>().HasData(
    new Pizza
    {
        Id = 1,
        Title = "Сирне курча",
        Price = 395,
        CategoryId = 5,
        IsSpicy = false,
        IsVegetarian = false,
        DoughType = 0
    }
);
```

Початкові дані додаються через Entity Framework Core Migration.

У проєкті створено 6 початкових піц.

---

# 6. REST API та PizzasController

Файл `Controllers/PizzasController.cs` відповідає за API для роботи з піцами.

Контролер використовує:

```csharp
private readonly AppDbContext _context;

public PizzasController(AppDbContext context)
{
    _context = context;
}
```

Через `AppDbContext` контролер отримує доступ до PostgreSQL.

## Отримання всіх піц

```csharp
[HttpGet]
public async Task<ActionResult<IEnumerable<Pizza>>> GetPizzas()
{
    return await _context.Pizzas.ToListAsync();
}
```

Endpoint:

```text
GET /api/Pizzas
```

Повертає список усіх піц.

---

## Отримання піци за ID

```csharp
[HttpGet("{id}")]
public async Task<ActionResult<Pizza>> GetPizza(int id)
{
    var pizza = await _context.Pizzas.FindAsync(id);

    if (pizza == null)
    {
        return NotFound();
    }

    return Ok(pizza);
}
```

Endpoint:

```text
GET /api/Pizzas/5
```

Повертає піцу з відповідним `Id`.

Якщо піцу не знайдено, API повертає HTTP `404 Not Found`.

---

## Додавання піци

```csharp
[HttpPost]
public async Task<ActionResult<Pizza>> PostPizza(Pizza pizza)
{
    _context.Pizzas.Add(pizza);
    await _context.SaveChangesAsync();

    return StatusCode(201, pizza);
}
```

Endpoint:

```text
POST /api/Pizzas
```

Метод додає новий об'єкт до `DbSet`, після чого `SaveChangesAsync()` зберігає його в PostgreSQL.

---

## Редагування піци

```csharp
[HttpPut("{id}")]
public async Task<IActionResult> PutPizza(
    int id,
    Pizza pizza)
{
    if (id != pizza.Id)
    {
        return BadRequest();
    }

    _context.Entry(pizza).State =
        EntityState.Modified;

    await _context.SaveChangesAsync();

    return Ok(pizza);
}
```

Endpoint:

```text
PUT /api/Pizzas/5
```

Метод змінює існуючий запис у базі даних.

---

## Видалення піци

```csharp
[HttpDelete("{id}")]
public async Task<IActionResult> DeletePizza(int id)
{
    var pizza = await _context.Pizzas.FindAsync(id);

    if (pizza == null)
    {
        return NotFound();
    }

    _context.Pizzas.Remove(pizza);
    await _context.SaveChangesAsync();

    return NoContent();
}
```

Endpoint:

```text
DELETE /api/Pizzas/5
```

Метод знаходить піцу за ID та видаляє її з PostgreSQL.

---

# 7. CRUD

Таким чином backend реалізує основні CRUD-операції:

| HTTP | Endpoint | Операція |
|---|---|---|
| GET | `/api/Pizzas` | Отримати всі піци |
| GET | `/api/Pizzas/{id}` | Отримати піцу |
| POST | `/api/Pizzas` | Додати піцу |
| PUT | `/api/Pizzas/{id}` | Редагувати піцу |
| DELETE | `/api/Pizzas/{id}` | Видалити піцу |

---

# 8. Entity Framework Core Migration

Для створення структури бази даних використовується **EF Core Migration**.

Основна migration:

```text
InitialCreate
```

Вона створює таблицю:

```text
Pizzas
```

з такими полями:

```text
Id
Title
Text
Price
Image
CategoryId
IsSpicy
IsVegetarian
DoughType
```

Також migration містить початкові дані для 6 піц.

EF Core зберігає інформацію про застосовані міграції у службовій таблиці:

```text
__EFMigrationsHistory
```

Основні команди:

```bash
dotnet ef migrations list --project backend
```

Перевірка створених міграцій.

```bash
dotnet ef database update --project backend
```

Застосування міграцій до бази даних.

---

# 9. PostgreSQL

У проєкті використовується PostgreSQL 16.

Основна база:

```text
pizza_db
```

Основна таблиця:

```text
Pizzas
```

PostgreSQL відповідає за постійне зберігання даних про піци.

Взаємодія з базою виконується через:

```text
ASP.NET Core
      ↓
Entity Framework Core
      ↓
Npgsql
      ↓
PostgreSQL
```

`Npgsql` є .NET-провайдером для PostgreSQL і дозволяє Entity Framework Core працювати з цією СУБД.

---

# 10. Docker

Для ізоляції та запуску компонентів проєкту використовується Docker.

У проєкті створено окремий Docker-контейнер для PostgreSQL та контейнер для ASP.NET Core backend.

Основні контейнери:

```text
pizza-postgres
pizza-backend
```

PostgreSQL використовує образ:

```text
postgres:16
```

Backend використовує:

```text
mcr.microsoft.com/dotnet/aspnet:8.0
```

---

# 11. Dockerfile для Backend

Файл `backend/Dockerfile` використовується для створення Docker-образу ASP.NET Core.

Основна частина:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["PizzaApi.csproj", "."]
RUN dotnet restore "PizzaApi.csproj"

COPY . .

RUN dotnet build "PizzaApi.csproj" \
    -c Release \
    -o /app/build
```

На першому етапі використовується .NET SDK для відновлення залежностей та компіляції проєкту.

Після цього використовується окремий runtime-образ:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /app/build .

EXPOSE 8080

ENTRYPOINT ["dotnet", "PizzaApi.dll"]
```

Це дозволяє використовувати готовий зібраний backend у легшому runtime-контейнері.

Backend працює на порту:

```text
8080
```

---

# 12. Docker Compose

Для одночасного запуску PostgreSQL та backend використовується Docker Compose.

Схема роботи:

```text
Docker Compose
       │
       ├── pizza-postgres
       │       ↓
       │   PostgreSQL 16
       │
       └── pizza-backend
               ↓
          ASP.NET Core 8
```

PostgreSQL працює на порту:

```text
5432
```

Backend:

```text
8080
```

Контейнери запускаються разом, що спрощує розгортання всього backend-середовища.

---

# 13. CORS

Оскільки frontend працює окремо від backend, у ASP.NET Core налаштований CORS:

```csharp
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
```

Це дозволяє React frontend виконувати HTTP-запити до API.

---

# 14. Swagger

Для тестування REST API підключено Swagger:

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
```

Swagger запускається через:

```csharp
app.UseSwagger();
app.UseSwaggerUI();
```

Після запуску backend документація API доступна за адресою:

```text
http://localhost:8080/swagger
```

Через Swagger можна переглядати доступні endpoints та тестувати GET, POST, PUT і DELETE запити.

---

# 15. Запуск проєкту

Для перевірки Docker-контейнерів використовується:

```bash
docker ps
```

Для запуску проєкту через Docker Compose:

```bash
docker compose up --build
```

Після запуску backend доступний за адресою:

```text
http://localhost:8080
```

Swagger:

```text
http://localhost:8080/swagger
```

API:

```text
http://localhost:8080/api/Pizzas
```

---

# 16. Результат роботи

У результаті було створено backend для Pizza-магазину на базі:

```text
C#
ASP.NET Core 8
Entity Framework Core
PostgreSQL
Docker
Docker Compose
```

Backend реалізує REST API для повного керування піцами.

Дані зберігаються у PostgreSQL, а Entity Framework Core забезпечує взаємодію між C# та базою даних.

Docker дозволяє запускати backend та PostgreSQL у контейнерах і створює відтворюване середовище для запуску проєкту.

Загальна структура:

```text
Pizza Project
│
├── frontend
│   └── React
│
├── backend
│   ├── Controllers
│   │   └── PizzasController.cs
│   │
│   ├── Models
│   │   ├── Pizza.cs
│   │   └── AppDbContext.cs
│   │
│   ├── Migrations
│   │   └── InitialCreate
│   │
│   ├── Program.cs
│   ├── appsettings.json
│   ├── Dockerfile
│   └── PizzaApi.csproj
│
└── docker-compose.yml
```

## Висновок

У ході розробки було створено повноцінну серверну частину вебзастосунку для роботи з даними про піци. Реалізовано REST API на ASP.NET Core, підключено PostgreSQL через Entity Framework Core та Npgsql, створено міграції бази даних і початкове наповнення таблиці.

Для контейнеризації backend та PostgreSQL використано Docker і Docker Compose. Це дозволяє запускати всі необхідні компоненти проєкту в ізольованому та однаковому середовищі.
