import { useState, useEffect } from 'react';
import CategoriesPanel from '../../components/CategoriesPanel/CategoriesPanel';
import ContentPizza from '../../components/ContentPizza/ContentPizza';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import Header from '../../components/Header/Header';
import '../../styles/main.scss';

function Home() {
  const [card, setCard] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    fetch('https://68f8bdb0deff18f212b74d15.mockapi.io/pizza/image')
      .then((response) => response.json())
      .then((data) => {
        setCard(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredData = card.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`container ${searchActive ? 'blurred' : ''}`}>
      <Header
        items={card}
        setSearch={setSearch}
        filteredData={filteredData}
        setSearchActive={setSearchActive}
        searchActive={searchActive}
      />
      <CategoriesPanel />
      <div className='main_content'>
        <FilterPanel />
        <ContentPizza items={card} loading={loading} />
      </div>

      {searchActive && (
        <div
          className="overlay"
          onClick={() => setSearchActive(false)}
        ></div>
      )}
    </div>
  );
}

export default Home;
