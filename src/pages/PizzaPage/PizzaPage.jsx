import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function PizzaPage() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    fetch(`https://68f8bdb0deff18f212b74d15.mockapi.io/pizza/image/${id}`)
      .then((res) => res.json())
      .then((data) => setPizza(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!pizza) return <div>Loading...</div>;

  return (
    <div className="container">
      <Header />
      <div className="pizza-page">
        <h2>{pizza.title}</h2>
        <img src={pizza.image} alt={pizza.title} />
        <p>{pizza.text}</p>
        <span>Цена: {pizza.price}$</span>
      </div>
    </div>
  );
}
