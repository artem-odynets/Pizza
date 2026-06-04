using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PizzaApi.Migrations
{
    /// <inheritdoc />
    public partial class AddFilteringFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Price",
                table: "Pizzas",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Pizzas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DoughType",
                table: "Pizzas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsSpicy",
                table: "Pizzas",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsVegetarian",
                table: "Pizzas",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Pizzas",
                columns: new[] { "Id", "CategoryId", "DoughType", "Image", "IsSpicy", "IsVegetarian", "Price", "Text", "Title" },
                values: new object[,]
                {
                    { 1, 0, 0, "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop", false, false, 395, "Соковите курча, моцарела, сири чеддер і пармезан, вершковий соус, томати, соус альфредо, часник", "Сирне курча" },
                    { 2, 0, 0, "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop", false, false, 449, "Гостра ковбаса чоризо, гострий перець халапеньо, соус барбекю, мітболи, томати, солодкий перець, червона цибуля, моцарела", "Діабло" },
                    { 3, 0, 0, "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop", false, false, 399, "М'ясний соус болоньєзе, соус бургер, солоні огірочки, томати, червона цибуля, моцарела", "Чізбургер-піца" },
                    { 4, 0, 0, "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=500&auto=format&fit=crop", false, false, 250, "Класична піца з великою кількістю моцарели, фірмовим томатним соусом та італійськими травами", "Маргарита" },
                    { 5, 0, 0, "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=500&auto=format&fit=crop", false, false, 350, "Пікантні ковбаски пепероні, багато сиру моцарела та класичний томатний соус", "Пепероні" },
                    { 6, 0, 0, "https://images.unsplash.com/photo-1571066811602-71683a3f680d?q=80&w=500&auto=format&fit=crop", false, false, 290, "Солодкий перець, томати, червона цибуля, маслини, свіжі печериці та сир моцарела", "Вегетаріанська" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Pizzas",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Pizzas",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Pizzas",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Pizzas",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Pizzas",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Pizzas",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Pizzas");

            migrationBuilder.DropColumn(
                name: "DoughType",
                table: "Pizzas");

            migrationBuilder.DropColumn(
                name: "IsSpicy",
                table: "Pizzas");

            migrationBuilder.DropColumn(
                name: "IsVegetarian",
                table: "Pizzas");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Pizzas",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }
    }
}
