import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchTodos = ()     => axios.get(`${BASE}?_limit=50`);
export const fetchTodo  = (id)   => axios.get(`${BASE}/${id}`);
export const createTodo = (data) => axios.post(BASE, data);
export const deleteTodo = (id)   => axios.delete(`${BASE}/${id}`);