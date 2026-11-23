import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getAllPizza = () => instance.get("Pizzas");
export const getPizzaById = (id) => instance.get(`Pizzas/${id}`);