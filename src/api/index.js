import axios from 'axios';

export const getTodos = async () =>
  axios.get('http://localhost:5000/api/tasks');
  
export const addTodo = async (todoData) =>
  axios.post('http://localhost:5000/api/tasks', todoData);

