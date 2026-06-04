import { useContext } from "react";
import { AppContext } from "../../AppContext";
import "./_categoriesPanel.scss";

export default function CategoriesPanel() {
  const { categoryId, setCategoryId } = useContext(AppContext);
  const categories = ['Усі', 'М\'ясні', 'Гострі', 'Вегетаріанські'];

  return (
    
    <div className='all_pizzas'>
      <hr/>
      <h2>Усі піци</h2>
      <div className='wrapper_top'>
        <ul className='list_categories'>
          {categories.map((name, i) => (
            <li 
              key={i} 
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
            >
              {name}
            </li>
          ))}
        </ul>

        <div className='sort_button'>
          <button>Сортування: <span>за рейтингом</span></button>
        </div>
      </div>
    </div>
  );
}