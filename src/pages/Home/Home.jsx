import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import CategoriesPanel from '../../components/CategoriesPanel/CategoriesPanel';
import ContentPizza from '../../components/ContentPizza/ContentPizza';
import FilterPanel from '../../components/FilterPanel/FilterPanel'; // 1. Імпортуй
import "./Home.scss";

function Home() {
  // 2. Дістань onApplyFilters з контексту
  const { loading, filteredData, onApplyFilters } = useContext(AppContext);
  
  return (
    <div className='home_page'>
      <CategoriesPanel />
      <div className='main_content'>
        {/* 3. Додай панель фільтрів сюди */}
        <FilterPanel onApplyFilters={onApplyFilters} />
        
        <ContentPizza items={filteredData} loading={loading} />
      </div>
    </div>
  );
}

export default Home;