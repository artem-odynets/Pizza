import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
import Search from "../Search/Search";

function Header() {
  const { searchActive, setSearchActive, setCartOpen, totalCartPrice, cart } = useContext(AppContext);
  
  const [account, setAccount] = useState(false);
  const closeRef = useRef(null);
  
  // Рахуємо загальну кількість штук піц у кошику
  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);

  const handleClickAccount = (e) => {
    e.preventDefault(); 
    setAccount(!account);
  };

  useEffect(() => {
    const closeAccount = (event) => {
      if (closeRef.current && !closeRef.current.contains(event.target)) {
        setAccount(false);
      }
    };
    document.addEventListener('mousedown', closeAccount);
    return () => document.removeEventListener('mousedown', closeAccount);
  }, []);

  return (
    <header className="header">
      <div className='header_left-block'>
        <img src="/assets/icons/logo-pizza.png" alt="logo" />
        <div className='header_text'>
          <h1>next pizza</h1>
          <span>смачніше вже нікуди</span>
        </div>
      </div>

      <div className='header_right-block'>
        <div className='input_wrapper'>
          <Search />
        </div>

        <div ref={closeRef} className='header_menu'>
          <a className='header_account' onClick={handleClickAccount} href='#'>Увійти</a>
          
          <button className='header_cart' onClick={() => setCartOpen(true)}>
            <div className="cart_count_wrapper">
              <img src='/assets/icons/cart.svg' alt="cart" />
              {totalCount > 0 && <b>{totalCount}</b>}
            </div>
            
            <div className="cart_delimiter"></div>

            {/* Замінив ₽ на ₴ */}
            <span>{totalCartPrice} ₴</span>
          </button>

          <div className={`${account ? "profile_show" : "profile"}`}>
            <div className="buttons_profile">
              <button>Налаштування</button>
              <button>Замовлення</button>
              <button>Вийти</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;