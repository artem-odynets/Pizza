import { useState } from "react";

export default function FilterPanel({ onApplyFilters }) {
  const [canAssemble, setCanAssemble] = useState(true);
  const [isNew, setIsNew] = useState(false);

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [selectedDough, setSelectedDough] = useState([]);

  const ingredientsList = [
    { id: "sauce", dbName: "соус", viewName: "Сирний соус" },
    { id: "mozzarella", dbName: "моцарела", viewName: "Моцарела" },
    { id: "pickles", dbName: "огірочки", viewName: "Солоні огірочки" },
    { id: "onion", dbName: "цибуля", viewName: "Червона цибуля" },
    { id: "tomatoes", dbName: "томати", viewName: "Томати" },
  ];

  const toggleSelection = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleApply = () => {
    onApplyFilters({
      canAssemble,
      isNew,
      priceFrom: priceFrom ? Number(priceFrom) : 0,
      priceTo: priceTo ? Number(priceTo) : Infinity,
      ingredients: selectedIngredients,
      dough: selectedDough,
    });
  };

  const handleReset = () => {
    setCanAssemble(true);
    setIsNew(false);
    setPriceFrom("");
    setPriceTo("");
    setSelectedIngredients([]);
    setSelectedDough([]);
    
    onApplyFilters(null);
  };

  return (
    <div className="filter">
      <h3 className="filter_title">Фільтрація</h3>

      <div className="filter_options">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={canAssemble}
            onChange={(e) => setCanAssemble(e.target.checked)}
          />
          <span className="custom_checkbox"></span>
          Можно збирати
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
          />
          <span className="custom_checkbox"></span>
          Новинки
        </label>
      </div>

      <hr />

      <div className="price_filter">
        <h4>Ціна від и до (₴):</h4>
        <div className="price_inputs">
          <input
            type="number"
            placeholder="0 ₴"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <input
            type="number"
            placeholder="800 ₴"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </div>
      </div>

      <h3 className="filter_title ingradients">Інгредієнти:</h3>
      <div className="filter_options">
        {ingredientsList.map((ing) => (
          <label className="checkbox" key={ing.id}>
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ing.dbName)}
              onChange={() => toggleSelection(ing.dbName, selectedIngredients, setSelectedIngredients)}
            />
            <span className="custom_checkbox"></span>
            {ing.viewName}
          </label>
        ))}

        <h3>Тип тіста</h3>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={selectedDough.includes("традиційне")}
            onChange={() => toggleSelection("традиційне", selectedDough, setSelectedDough)}
          />
          <span className="type"></span>
          Традиційне
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={selectedDough.includes("тонке")}
            onChange={() => toggleSelection("тонке", selectedDough, setSelectedDough)}
          />
          <span className="type"></span>
          Тонке
        </label>
      </div>

      <div className="filter_buttons" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <button className="use_filter-button" onClick={handleApply}>
          Застосувати
        </button>
        <button 
          className="reset_filter-button" 
          onClick={handleReset}
          style={{
            background: '#f3f3f3',
            color: '#555',
            border: 'none',
            padding: '10px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.15s ease'
          }}
        >
          Очистити фільтри 
        </button>
      </div>
    </div>
  );
}