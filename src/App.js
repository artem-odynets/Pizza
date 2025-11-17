import './styles/main.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getAllPizza } from './api/pizzaApi';
import { AppContext } from './AppContext';
import { useState } from 'react';
import Home from "./pages/Home/Home";
import PizzaPage from "./pages/PizzaPage/PizzaPage";
import Header from "./components/Header/Header";

function App() {
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pizzas"],
    queryFn: () => getAllPizza().then(res => res.data),
    staleTime: 5 * 60 * 1000 
  });

  const pizzas = data || [];

  const filteredData = pizzas.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='container'>
      <AppContext.Provider value={{
        search, setSearch,
        searchActive, setSearchActive,
        card: pizzas, 
        loading: isLoading,
        filteredData
      }}>
        <Router>
          <Header />

          {isLoading && <h2>Завантаження...</h2>}
          {isError && <h2>Помилка: {error.message}</h2>}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza/:id" element={<PizzaPage />} />
          </Routes>

          {searchActive && (
            <div
              className="overlay"
              onClick={() => setSearchActive(false)}
            ></div>
          )}
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
