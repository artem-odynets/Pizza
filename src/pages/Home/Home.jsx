import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import CategoriesPanel from '../../components/CategoriesPanel/CategoriesPanel';
import ContentPizza from '../../components/ContentPizza/ContentPizza';
import FilterPanel from '../../components/FilterPanel/FilterPanel'; 
import "./Home.scss";

function Home() {
  const { loading, filteredData, onApplyFilters } = useContext(AppContext);
  
  return (
    <div className='home_page'>
      <CategoriesPanel />
      <div className='main_content'>
        <FilterPanel onApplyFilters={onApplyFilters} />
        
        <ContentPizza items={filteredData} loading={loading} />
      </div>
    </div>
  );
}

export default Home;