export default function CategoriesPanel() {
  return (
        <div className='all_pizzas'>
      <div className='content_wrapper'>
      <hr/>  
       <h2>Все пиццы</h2>

       
  <div className='categories_wrapper'>
      <ul className='list_categories'>
        <li>Все</li>
        <li>Мясные</li>
        <li>Острые</li>
        <li>Сладкие</li>
        <li>Вегетарианские</li>
        <li>С курицей</li>
        <li className='list_categories-arrow'>Ещё </li>
      </ul>
</div>
</div>
      <div className='sort_button'>
      <button>Сортировка: <span>рейтингу</span></button>
      </div>
      
    </div>
  )
}
