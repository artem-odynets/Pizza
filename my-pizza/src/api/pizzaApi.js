/*import axios from "axios";

const instance = axios.create({
    baseURL: "https://68f8bdb0deff18f212b74d15.mockapi.io/pizza",
});

export const getAllPizza = () => instance.get('/image');
export const getPizzaById = (id) => instance.get(`/image/${id}`);*/
import axios from "axios";

const instance = axios.create({
  // Локальна адреса твоєї C# програми
  baseURL: "https://localhost:7258/api/", 
});

// Додаємо слеш перед Pizzas, щоб запити йшли чітко на /api/Pizzas та /api/Pizzas/1
export const getAllPizza = () => instance.get('Pizzas');
export const getPizzaById = (id) => instance.get(`Pizzas/${id}`);