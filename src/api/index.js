import axios from 'axios';

export const getTodos = async () =>
  axios.get('http://localhost:5000/api/tasks');

