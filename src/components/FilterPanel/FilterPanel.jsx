
export default function FilterPanel() {
  return (
    <div className="filter">
  <h3 className="filter_title">Фильтрация</h3>

  <div className="filter_options">
    <label className="checkbox">
      <input type="checkbox" defaultChecked />
      <span className="custom_checkbox"></span>
      Можно собирать
    </label>

    <label className="checkbox">
      <input type="checkbox" />
      <span className="custom_checkbox"></span>
      Новинки
    </label>
  </div>

  <hr />

  <div className="price_filter">
    <h4>Цена от и до:</h4>
    <div className="price_inputs">
      <input type="number" placeholder="0" />
      <input type="number" placeholder="1950" />
    </div>
  </div>


    <h3 className="filter_title ingradients">Ингредиенты:</h3>
    <div className="filter_options">
     <label className="checkbox">
      <input type="checkbox"/>
      <span className="custom_checkbox"></span>
         Сырный соус
    </label>

     <label className="checkbox">
      <input type="checkbox"/>
      <span className="custom_checkbox"></span>
         Моцарелла
    </label>

     <label className="checkbox">
      <input type="checkbox"/>
      <span className="custom_checkbox"></span>
       Солённые огурчики
    </label>

     <label className="checkbox">
      <input type="checkbox"/>
      <span className="custom_checkbox"></span>
        Красный лук
    </label>

     <label className="checkbox">
      <input type="checkbox"/>
      <span className="custom_checkbox"></span>
        Томаты
    </label>

    <a>+ Показать всё</a>


        <h3>Тип теста</h3>

     <label className="checkbox">
      <input type="checkbox"/>
      <span className="type"></span>
        Традиционное
    </label>

    
     <label className="checkbox">
      <input type="checkbox"/>
      <span className="type"></span>
       Тонкое
    </label>
    </div>
    <button className="use_filter-button">Применить</button>
</div>

  )
}
