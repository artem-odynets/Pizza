namespace PizzaApi.Models
{
    public class Pizza
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int Price { get; set; }
        public string Image { get; set; }

        // Поля для фільтрації та сортування:
        public int CategoryId { get; set; } // 1 - М'ясні, 2 - Вегетаріанські, 3 - Гострі і т.д.
        public bool IsSpicy { get; set; }
        public bool IsVegetarian { get; set; }
        public int DoughType { get; set; } // 0 - традиційне, 1 - тонке
    }
}