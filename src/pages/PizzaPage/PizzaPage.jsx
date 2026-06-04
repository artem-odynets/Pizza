import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPizzaById } from "../../api/pizzaApi";
import { useContext, useState, useEffect } from "react";
import ContentPizza from "../../components/ContentPizza/ContentPizza";
import "../PizzaPage/PizzaPage.scss";
import { AppContext } from "../../AppContext";

// Масив інгредієнтів з цінами в грн
const INGREDIENTS_DATA = [
  { id: 'border', name: 'Сирний бортик', price: 45, image: '/assets/images/image10.png' },
  { id: 'mozzarella', name: 'Вершкова моцарела', price: 35, image: '/assets/images/image11.png' },
  { id: 'cheddar', name: 'Сири чеддер та пармезан', price: 40, image: '/assets/images/image12.png' },
  { id: 'chicken', name: 'Ніжне курча', price: 35, image: '/assets/images/image13.png' },
];

export default function PizzaPage() {
  const { card, loading, addToCart } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Повністю українські назви конфігурацій
  const doughTypes = ['Традиційне', 'Тонке'];
  const sizes = ['Маленька', 'Середня', 'Велика'];

  // Стейти для вибору розміру, тіста та додатків
  const [size, setSize] = useState(0);
  const [dough, setDough] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  
  // Стейт для візуального ефекту кнопки "Додано"
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 30);
    setSelectedIngredients([]); 
    setIsAdded(false);
  }, [id]);

  const { data: pizza, isLoading, isError } = useQuery({
    queryKey: ["pizza", id],
    queryFn: () => getPizzaById(Number(id)).then(res => res.data),
  });

  if (isLoading) return <div className="container">Завантаження...</div>;

  if (isError || !pizza) {
    return (
      <div className="container">
        <h2>Упс! Піцу не знайдено 🍕</h2>
        <button className="back_btn" onClick={() => navigate("/")}>Назад на головну</button>
      </div>
    );
  }

  // --- ЛОГІКА ДИНАМІЧНОГО РОЗРАХУНКУ ЦІНИ ---
  // 1. Базова ціна піци (переведена з рублів у гривні)
  const basePriceInUah = Math.round(pizza.price * 0.4);

  // 2. Зміна ціни залежно від розміру
  let sizeModifier = 0;
  if (size === 1) sizeModifier = 40;  // Середня піца +40 грн
  if (size === 2) sizeModifier = 80;  // Велика піца +80 грн

  // 3. Зміна ціни залежно від типу тіста
  let doughModifier = 0;
  if (dough === 0) doughModifier = 15; // Традиційне пишне тісто дорожче на +15 грн

  // 4. Сума вибраних інгредієнтів
  const ingredientsPrice = selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);

  // 🔥 Загальна підсумкова вартість, яка реагує на кожен клік
  const totalPizzaPrice = basePriceInUah + sizeModifier + doughModifier + ingredientsPrice;

  const handleToggleIngredient = (ingredient) => {
    if (selectedIngredients.some(item => item.id === ingredient.id)) {
      setSelectedIngredients(prev => prev.filter(item => item.id !== ingredient.id));
    } else {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };

  const handleAddToCartClick = () => {
    // Відправляємо в глобальний кошик повну конфігурацію
    addToCart(pizza, size, dough, selectedIngredients, totalPizzaPrice);
    
    // Вмикаємо тригер успішного додавання
    setIsAdded(true);
    
    // Через 1.5 секунди повертаємо кнопці початковий стан
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div key={id} className="container">
      <hr/>
      <div className="nav_wrapper">
        <div className="nav_page">
          Головна <span>/</span> Піци <span>/</span> <span>{pizza?.title}</span>
        </div>
        <button className="back_btn" onClick={() => navigate("/")}>
          <span>←</span> Назад
        </button>
      </div>

      <div className="pizza_page">
        <img src={pizza?.image} alt={pizza?.title} className="pizza_img"/>
        <div className="pizza_wrapper">
          <h2>{pizza?.title}</h2>

          {/* Вибір розміру піци */}
          <div className="buttons_wrapper">
            {sizes.map((item, index) => (
              <button 
                key={index} 
                className={size === index ? 'active' : ''} 
                onClick={() => setSize(index)}
              >
                {item}
              </button>
            ))} 
          </div>

          {/* Вибір типу тіста */}
          <div className="buttons_wrapper">
            {doughTypes.map((item, index) => (
              <button 
                key={index} 
                className={dough === index ? 'active' : ''} 
                onClick={() => setDough(index)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Список інгредієнтів */}
          <div className="ingradients_list"> 
            <h2>Додати в піцу</h2> 
            <div className="supplements"> 
              {INGREDIENTS_DATA.map((ing) => {
                const isSelected = selectedIngredients.some(item => item.id === ing.id);
                return (
                  <div 
                    key={ing.id}
                    className={`supplements_list ${isSelected ? 'active' : ''}`}
                    onClick={() => handleToggleIngredient(ing)}
                  > 
                    {isSelected && <span className="checked_badge">✓</span>}
                    <img src={ing.image} alt={ing.name}/> 
                    <p>{ing.name}</p> 
                    <span>{ing.price} ₴</span> 
                  </div> 
                );
              })}
            </div> 
          </div>

          {/* Кнопка з динамічною ціною, інтерактивним стейтом та відступом 32px */}
          <button 
            className={`add_pizza_cart ${isAdded ? 'success_added' : ''}`}
            style={{ 
              marginTop: '32px', 
              display: 'block', 
              width: '100%',
              backgroundColor: isAdded ? '#24b43c' : '#fe5f1e',
              transition: 'all 0.2s ease-in-out'
            }}
            onClick={handleAddToCartClick}
            disabled={isAdded}
          >
            {isAdded ? "Додано в кошик! ✅" : `Додати в кошик за ${totalPizzaPrice} ₴`}
          </button>
        </div>
      </div>

      <div className="recommended">
        <h2>Рекомендації</h2>
        <ContentPizza items={card} loading={loading} limit={4} />
      </div>
    </div>
  );
}