using Microsoft.EntityFrameworkCore;
using PizzaApi.Models;

namespace PizzaApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Pizza> Pizzas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Pizza>().HasData(
                new Pizza
                {
                    Id = 1,
                    Title = "Сирне курча",
                    Text = "Соковите курча, моцарела, сири чеддер і пармезан, вершковий соус, томати, соус альфредо, часник",
                    Price = 395,
                    Image = "/assets/images/img1.png",
                    CategoryId = 5,
                    IsSpicy = false,
                    IsVegetarian = false,
                    DoughType = 0
                },
                new Pizza
                {
                    Id = 2,
                    Title = "Діабло",
                    Text = "Гостра ковбаса чоризо, гострий перець халапеньо, соус барбекю, мітболи, томати, солодкий перець, червона цибуля, моцарела",
                    Price = 449,
                    Image = "/assets/images/img2.png",
                    CategoryId = 2,
                    IsSpicy = true,
                    IsVegetarian = false,
                    DoughType = 0
                },
                new Pizza
                {
                    Id = 3,
                    Title = "Чізбургер-піца",
                    Text = "М'ясний соус болоньєзе, соус бургер, солоні огірочки, томати, червона цибуля, моцарела",
                    Price = 399,
                    Image = "/assets/images/img3.png",
                    CategoryId = 1,
                    IsSpicy = false,
                    IsVegetarian = false,
                    DoughType = 1
                },
                new Pizza
                {
                    Id = 4,
                    Title = "Маргарита",
                    Text = "Класична піца з великою кількістю моцарели, фірмовим томатним соусом та італійськими травами",
                    Price = 250,
                    Image = "/assets/images/img4.png",
                    CategoryId = 4,
                    IsSpicy = false,
                    IsVegetarian = true,
                    DoughType = 1
                },
                new Pizza
                {
                    Id = 5,
                    Title = "Пепероні",
                    Text = "Пікантні ковбаски пепероні, багато сиру моцарела та класичний томатний соус",
                    Price = 350,
                    Image = "/assets/images/img5.png",
                    CategoryId = 1,
                    IsSpicy = false,
                    IsVegetarian = false,
                    DoughType = 0
                },
                new Pizza
                {
                    Id = 6,
                    Title = "Вегетаріанська",
                    Text = "Солодкий перець, томати, червона цибуля, маслини, свіжі печериці та сир моцарела",
                    Price = 290,
                    Image = "/assets/images/img6.png",
                    CategoryId = 4,
                    IsSpicy = false,
                    IsVegetarian = true,
                    DoughType = 0
                }
            );
        }
    }
}