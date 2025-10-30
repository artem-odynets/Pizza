import { useState, useRef,useEffect } from "react";

export default function Search({ items = [], setSearch, setSearchActive, searchActive }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const searchRef = useRef(null);
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setSearch(value);

    if (value.trim()) {
        setSearchActive(true)
      const result = items.filter(item =>
        item.title.toLowerCase().includes(value)
      );
      
      setFiltered(result);
      
    } else {
      setFiltered([]);
      setSearchActive(false);
    }
  };
      const clearInput = () => {
    setQuery("");
    setSearch("");
    setSearchActive(false);
    setFiltered([]);
  };

 useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setFiltered([]);
      setSearchActive(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [setSearchActive]);

  return (
    <div ref={searchRef} className="searchbar">
      <input
        type="text"
        placeholder="Поиск пиццы..."
        value={query}
        onChange={handleChange}
      />
      {query ? <button className="close_button" onClick={clearInput}>x</button> : ''}

      {filtered.length > 0 && (
        <ul className={`${searchActive ? 'searchbar-dropdown' : 'search_none'}`}>
          {filtered.map((pizza) => (
            <li key={pizza.id}>
              <img src={pizza.image} alt={pizza.title} />
              <span>{pizza.title}</span>
              <span className="price">{pizza.price}₽</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
