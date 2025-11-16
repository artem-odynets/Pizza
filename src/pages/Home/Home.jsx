import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import CategoriesPanel from '../../components/CategoriesPanel/CategoriesPanel';
import ContentPizza from '../../components/ContentPizza/ContentPizza';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import "./Home.scss";

function Home() {
  const { card, loading, search, filteredData } = useContext(AppContext);
  const num =6;
 
  return (
    <div className='home_page'>
      <CategoriesPanel />
      <div className='main_content'>
        <FilterPanel />
        <ContentPizza items={filteredData} loading={loading} limit={num} />
      </div>
    </div>
  );
}

export default Home;
