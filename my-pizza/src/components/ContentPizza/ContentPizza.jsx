import { useContext } from "react";
import { AppContext } from "../../AppContext";
import ButtonAdd from "../ui/ButtonAdd/ButtonAdd";
import SkeletonPizza from "./SkeletonPizza";
import { useNavigate } from "react-router-dom";

export default function ContentPizza({ items, loading, limit }) {
  const { addToCart, cart, updateCount } = useContext(AppContext); 
  const navigate = useNavigate();
  
  const displayedItems = limit ? items.slice(0, limit) : items;

  return (
    <section className='content_pizza'>
      {loading
        ? [...new Array(limit || 30)].map((_, i) => <SkeletonPizza key={i} />)
        : displayedItems.map((item) => {
            const defaultCartItemId = `${item.id}-0-0-[]`;
            const cartItem = cart.find(cartObj => cartObj.cartItemId === defaultCartItemId);
            
            const priceInUah = Math.round(item.price * 0.4);

            return (
              <div 
                key={item.id} 
                className="pizza-item"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/pizza/${item.id}`)}
              >
                <div className='block_content'>
                  <img src={item.image} alt={item.title}/>
                  <div className="wrapper_desc">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                     
                    <div className="wrapper_price">
                      <span>від {priceInUah} ₴</span>
                      
                      {cartItem ? (
                        <div 
                          className="pizza_count_selector" 
                          onClick={(e) => e.stopPropagation()} 
                        >
                          <button 
                            className="minus_btn" 
                            onClick={() => updateCount(defaultCartItemId, -1)}
                          >
                            −
                          </button>
                          
                          <span className="count_num">{cartItem.count}</span>
                          
                          <button 
                            className="plus_btn" 
                            onClick={() => updateCount(defaultCartItemId, 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <ButtonAdd onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item, 0, 0, [], priceInUah);
                        }} />
                      )}

                    </div>
                  </div>
                </div>
              </div>
            );
          })
      }
    </section>
  );
}