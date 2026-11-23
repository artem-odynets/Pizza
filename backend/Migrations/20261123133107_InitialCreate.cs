using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PizzaApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pizzas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<int>(type: "integer", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    IsSpicy = table.Column<bool>(type: "boolean", nullable: false),
                    IsVegetarian = table.Column<bool>(type: "boolean", nullable: false),
                    DoughType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pizzas", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Pizzas",
                columns: new[] { "Id", "CategoryId", "DoughType", "Image", "IsSpicy", "IsVegetarian", "Price", "Text", "Title" },
                values: new object[,]
                {
                    { 1, 5, 0, "/assets/images/img1.png", false, false, 395, "Соковите курча, моцарела, сири чеддер і пармезан, вершковий соус, томати, соус альфредо, часник", "Сирне курча" },
                    { 2, 2, 0, "/assets/images/img2.png", true, false, 449, "Гостра ковбаса чоризо, гострий перець халапеньо, соус барбекю, мітболи, томати, солодкий перець, червона цибуля, моцарела", "Діабло" },
                    { 3, 1, 1, "/assets/images/img3.png", false, false, 399, "М'ясний соус болоньєзе, соус бургер, солоні огірочки, томати, червона цибуля, моцарела", "Чізбургер-піца" },
                    { 4, 4, 1, "/assets/images/img4.png", false, true, 250, "Класична піца з великою кількістю моцарели, фірмовим томатним соусом та італійськими травами", "Маргарита" },
                    { 5, 1, 0, "/assets/images/img5.png", false, false, 350, "Пікантні ковбаски пепероні, багато сиру моцарела та класичний томатний соус", "Пепероні" },
                    { 6, 4, 0, "/assets/images/img6.png", false, true, 290, "Солодкий перець, томати, червона цибуля, маслини, свіжі печериці та сир моцарела", "Вегетаріанська" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pizzas");
        }
    }
}
