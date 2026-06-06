import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import "./_checkoutPage.scss";

export default function CheckoutPage() {
  const { cart, totalCartPrice, updateCount, removeFromCart } = useContext(AppContext);
  const navigate = useNavigate();

  const deliveryPrice = 120;
  const tax = 22;
  const finalTotal = totalCartPrice + deliveryPrice + tax;

  const sizes = ['Маленька', 'Середня', 'Велика'];
  const doughTypes = ['Традиційне', 'Тонке'];

  return (
    <div className="container checkout_page">
      <div className="header_row">
        <h1>Оформлення замовлення</h1>
        <button className="back_button" onClick={() => navigate(-1)}>← Назад</button>
      </div>
      
      <div className="checkout_content">
        <div className="checkout_left">
          {/* 1. Кошик */}
          <section className="checkout_section">
            <h2>1. Кошик</h2>
            {cart.map((item) => (
              <div key={item.cartItemId} className="cart_item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{sizes[item.size]}, {doughTypes[item.dough]} тісто</p>
                </div>
                <div className="count_controls">
                  <button onClick={() => updateCount(item.cartItemId, -1)}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => updateCount(item.cartItemId, 1)}>+</button>
                </div>
                <span className="item_total_price">{item.price * item.count} ₴</span>
                <button className="remove_btn" onClick={() => removeFromCart(item.cartItemId)}>✕</button>
              </div>
            ))}
          </section>

          {/* 2. Персональні дані */}
          <section className="checkout_section">
            <h2>2. Персональні дані</h2>
            <div className="form_group">
              <input type="text" placeholder="Ім'я" />
              <input type="text" placeholder="Прізвище" />
              <input type="email" placeholder="E-mail" />
              <input type="tel" placeholder="Телефон" />
            </div>
          </section>

          {/* 3. Адреса доставки */}
          <section className="checkout_section">
            <h2>3. Адреса доставки</h2>
            <div className="form_group">
              <input type="text" placeholder="Адреса (вулиця, будинок, квартира)" />
              <textarea placeholder="Коментар до замовлення" rows="3"></textarea>
            </div>
          </section>
        </div>

        {/* Права колонка з підсумком */}
        <div className="checkout_summary">
          <h2>Всього: {finalTotal} ₴</h2>
          <div className="summary_details">
            <p>Товари: <span>{totalCartPrice} ₴</span></p>
            <p>Податки: <span>{tax} ₴</span></p>
            <p>Доставка: <span>{deliveryPrice} ₴</span></p>
          </div>
          <button className="pay_btn">Перейти до оплати</button>
        </div>
      </div>
    </div>
  );
}