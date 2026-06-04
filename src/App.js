import './styles/main.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getAllPizza } from './api/pizzaApi';
import { AppContext } from './AppContext';
import { useState, useMemo } from 'react';
import Home from "./pages/Home/Home";
import PizzaPage from "./pages/PizzaPage/PizzaPage";
import Header from "./components/Header/Header";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';

function App() {
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  const [categoryId, setCategoryId] = useState(0);

  const getCategoryByName = (title) => {
    const t = title.toLowerCase();
    if (t.includes('чізбургер') || t.includes('пепероні') || t.includes('бекон')) return 1;
    if (t.includes('діабло')) return 2;
    if (t.includes('сирн') || t.includes('маргар') || t.includes('вегетаріан')) return 3;
    return 0;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pizzas"],
    queryFn: () => getAllPizza().then(res => res.data),
  });

  const filteredData = useMemo(() => {
    const pizzas = (data || []).map(item => ({
      ...item,
      category: getCategoryByName(item.title)
    }));

    return pizzas.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryId === 0 || item.category === categoryId;
      if (!matchesSearch || !matchesCategory) return false;
      if (!activeFilters) return true;

      const priceInUah = Math.round(item.price * 0.4);
      const matchesPrice = priceInUah >= activeFilters.priceFrom && priceInUah <= activeFilters.priceTo;
      const matchesIngredients = activeFilters.ingredients.length === 0 || 
        activeFilters.ingredients.every(ing => item.text.toLowerCase().includes(ing.toLowerCase()));
      return matchesPrice && matchesIngredients;
    });
  }, [data, search, categoryId, activeFilters]);

  const addToCart = (pizza, size = 0, dough = 0, selectedIngredients = [], customPrice = null) => {
    const cartItemId = `${pizza.id}-${size}-${dough}-[${selectedIngredients.map(i => i.id).join(',')}]`;
    setCart((prev) => {
      const exists = prev.find(i => i.cartItemId === cartItemId);
      return exists ? prev.map(i => i.cartItemId === cartItemId ? { ...i, count: i.count + 1 } : i) : [...prev, { ...pizza, price: customPrice || Math.round(pizza.price * 0.4), size, dough, selectedIngredients, cartItemId, count: 1 }];
    });
  };

  // --- ДОДАНО ФУНКЦІЮ ДЛЯ ОНОВЛЕННЯ КІЛЬКОСТІ ---
  const updateCount = (cartItemId, amount) => {
    setCart((prevCart) => prevCart.map((item) => {
      if (item.cartItemId === cartItemId) {
        const newCount = item.count + amount;
        return newCount > 0 ? { ...item, count: newCount } : item;
      }
      return item;
    }).filter(item => item.count > 0));
  };

  return (
    <div className='container'>
      <AppContext.Provider value={{
        search, setSearch, searchActive, setSearchActive,
        card: data || [], loading: isLoading, filteredData,
        cart, addToCart, updateCount, // <-- ТЕПЕР ФУНКЦІЯ ПЕРЕДАНА У КОНТЕКСТ
        cartOpen, setCartOpen,
        totalCartPrice: cart.reduce((sum, item) => sum + item.price * item.count, 0),
        onApplyFilters: setActiveFilters,
        categoryId, setCategoryId 
      }}>
        <Router>
          <Header />
          <CartDrawer />
          {isError && <h2 className="container">Помилка: {error.message}</h2>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza/:id" element={<PizzaPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;