import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import "./_cartDrawer.scss";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateCount, removeFromCart, totalCartPrice } = useContext(AppContext);
  const navigate = useNavigate(); 

  if (!cartOpen) return null;

  const doughTypes = ['Традиційне', 'Тонке'];
  const sizes = ['Маленька', 'Середня', 'Велика'];

  const handleCheckout = () => {
    setCartOpen(false); 
    navigate("/checkout"); 
  };

  return (
    <div className="cart_overlay" onClick={() => setCartOpen(false)}>
      <div className="cart_drawer" onClick={(e) => e.stopPropagation()}>
        
        <div className="cart_header">
          <h2>У кошику ({cart.reduce((sum, item) => sum + item.count, 0)} тов.)</h2>
          <button className="close_btn" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty_cart">
            <img src="/assets/images/empty-box.png" alt="Порожній кошик" />
            <h3>Кошик порожній</h3>
            <p>Додайте хоча б одну піцу, щоб оформити замовлення</p>
            <button className="back_btn" onClick={() => setCartOpen(false)}>
              ← Повернутися назад
            </button>
          </div>
        ) : (
          <>
            <div className="cart_items_list">
              {cart.map((item) => (
                <div key={item.cartItemId} className="cart_item">
                  <img src={item.image} alt={item.title} className="item_img" />
                  
                  <div className="item_info">
                    <h3>{item.title}</h3>
                    <p>{sizes[item.size]}, {doughTypes[item.dough]} тісто</p>
                    
                    {item.selectedIngredients && item.selectedIngredients.length > 0 && (
                      <p className="item_ingredients_desc" style={{ color: '#fe5f1e', fontSize: '12px', marginTop: '2px' }}>
                        + {item.selectedIngredients.map(ing => ing.name).join(', ')}
                      </p>
                    )}
                    
                    <div className="item_bottom">
                      <div className="count_selector">
                        <button onClick={() => updateCount(item.cartItemId, -1)}>−</button>
                        <span>{item.count}</span>
                        <button onClick={() => updateCount(item.cartItemId, 1)}>+</button>
                      </div>
                      <span className="item_price">{item.price * item.count} ₴</span>
                    </div>
                  </div>

                  <button className="delete_item_btn" onClick={() => removeFromCart(item.cartItemId)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart_footer">
              <div className="total_row">
                <span>Разом:</span>
                <div className="dashed_line"></div>
                <b>{totalCartPrice} ₴</b>
              </div>
              <div className="total_row">
                <span>Податок 5%:</span>
                <div className="dashed_line"></div>
                <b>{Math.round(totalCartPrice * 0.05)} ₴</b>
              </div>
              <button className="checkout_btn" onClick={handleCheckout}>
                Оформити замовлення →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}