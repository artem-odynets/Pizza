import axios from "axios";

const instance = axios.create({
    baseURL: "https://68f8bdb0deff18f212b74d15.mockapi.io/pizza",
});

export const getAllPizza = () => instance.get('/image');
export const getPizzaById = (id) => instance.get(`/image/${id}`);