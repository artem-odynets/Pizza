import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPizzaById } from "../../api/pizzaApi";
import { useContext, useState } from "react";
import { useEffect } from "react";
import ContentPizza from "../../components/ContentPizza/ContentPizza";
import "../PizzaPage/PizzaPage.scss";
import { AppContext } from "../../AppContext";

export default function PizzaPage() {
  const { card, loading } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const doughTypes = ['Традиционное', 'Тонкое'];
  const sizes = ['Маленькая','Средняя', 'Большая'];

  const [size, setSize] = useState(0);
  const [dough, setDough] = useState(0);
useEffect(() => {
  window.scrollTo(0, 30);
}, [id]);
  const { data: pizza, isLoading } = useQuery({
    queryKey: ["pizza", id],
    queryFn: () => getPizzaById(id).then(res => res.data)
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div key={id} className="container">
      <hr/>
      <div className="nav_wrapper">
        <div className="nav_page">
          Главная <span>/</span> Пиццы <span>/</span> <span>{pizza.title}</span>
        </div>
        <button className="back_btn" onClick={() => navigate("/")}>
          <span>←</span> Назад
        </button>
      </div>

      <div className="pizza_page">
        <img src={pizza.image} alt={pizza.title} className="pizza_img"/>
        <div className="pizza_wrapper">
          <h2>{pizza.title}</h2>

          <div className="buttons_wrapper">
            {sizes.map((item, index) => (
              <button 
                key={index} 
                className={size === index ? 'active' : ''} 
                onClick={() => setSize(index)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="buttons_wrapper">
            {doughTypes.map((item, index) => (
              <button 
                key={index} 
                className={dough === index ? 'active' : ''} 
                onClick={() => setDough(index)}
              >
                {item}
              </button>
            ))}
          </div>
<div className="ingradients_list"> 
  <h2>Ингредиенты</h2> 
  <div className="supplements"> 

    <div className='supplements_list'> 
      <img src="/assets/images/image10.png"/> 
      <p>Сырный бортик</p> <span>179 ₽</span> 
      </div> 

      <div className="supplements_list"> 
        <img src="/assets/images/image11.png"/> 
        <p>Сливочная моцарелла</p> <span>179 ₽</span> 
        </div>

         <div className="supplements_list">
           <img src="/assets/images/image12.png"/>
            <p>Сыры чеддер и пармезан</p> <span>179 ₽</span>
             </div> 

            <div className="supplements_list"> 
              <img src="/assets/images/image13.png"/> 
              <p>Нежный цыпленок</p> <span>179 ₽</span> 
              </div> 

              </div> 
              </div>
          <button className="add_pizza_cart">
            Добавить в корзину за {pizza.price}₽
          </button>
        </div>
      </div>

      <div className="recommended">
        <h2>Рекомендации</h2>
        <ContentPizza items={card} loading={loading} limit={4} />
      </div>
    </div>
  );
}
