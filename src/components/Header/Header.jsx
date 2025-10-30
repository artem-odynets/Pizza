import Search from "../Search/Search";
import { useState, useRef, useEffect } from "react";

function Header({ items, setSearch, setSearchActive, searchActive }) {
  const [account, setAccount] = useState(false);
  const closeRef = useRef(null);

  const handleClickAccount = () => {
    setAccount(!account);
  }

  useEffect(() => { 
    const closeAccount = (event) => {
       if(closeRef.current && !closeRef.current.contains(event.target)) {
      setAccount(false);
   }
    }
  document.addEventListener('mousedown', closeAccount);
    return () => {
      document.removeEventListener('mousedown',closeAccount);
    }
  }, [])
  
  return (
    
    <header className="header">
      <div className='header_left-block'>
        <img src="/assets/icons/logo-pizza.png" alt="logo"/>
        <div className='header_text'>
          <h1>next pizza</h1>
          <span>вкусней уже некуда</span>
        </div>
      </div>

      <div className='header_right-block'>
        <div className='input_wrapper'>
          <Search items={items} 
          setSearch={setSearch} 
          setSearchActive={setSearchActive} 
          searchActive={searchActive} />
        </div>
        <div ref={closeRef} className='header_menu'>
        <a className='header_account'onClick={handleClickAccount} href='#'>Войти</a>

          <a className='header_cart' href='#'>
            <img src='/assets/icons/cart.svg' alt="cart"/>
          </a>
     <div className={`${account ? "profile_show" : "profile"}`}>
      <div className="buttons_profile">
      <button>Настройки</button>
      <button>Заказы</button>
      <button>Выйти</button>
      </div>
    </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
