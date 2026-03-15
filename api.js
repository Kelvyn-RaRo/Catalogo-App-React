import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const getProductsByCategory = (category) =>
  api.get(`/products/category/${category}`);

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export default api;