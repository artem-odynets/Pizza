import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom";
export default function Search() {
  const { setSearch, setSearchActive, searchActive, card } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const searchRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setSearch(value);

    if (value.trim()) {
      setSearchActive(true);

      const result = card.filter(item =>
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
      {query && (
        <button className="close_button" onClick={clearInput}>
          ×
        </button>
      )}

      {filtered.length > 0 && (
        <ul className={`${searchActive ? 'searchbar-dropdown' : 'search_none'}`}>
         
          {filtered.map((pizza) => (
            
            <li key={pizza.id}>
               <Link to={`/pizza/${pizza.id}`} onClick={() => {
                 setSearchActive(false);
                 setFiltered([]);
                 setQuery("");
                 }}>
              <img src={pizza.image} alt={pizza.title} />
              <span>{pizza.title}</span>
              <span className="price">{pizza.price}₽</span>
              </Link>
            </li>
             
          ))}
         
        </ul>
      )}
    </div>
  );
}
