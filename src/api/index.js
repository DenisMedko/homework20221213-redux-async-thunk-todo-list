import axios from 'axios';

export const getOnServer = async () =>
  axios.get('http://localhost:5000/api/tasks');
  
export const addOnServer = async (todoData) =>
  axios.post('http://localhost:5000/api/tasks', todoData);
  
export const removeOnServer = async (id) =>
  axios.delete(`http://localhost:5000/api/tasks/${id}`);

export const changeOnServer = async (id, todoData) =>
  axios.put(`http://localhost:5000/api/tasks/${id}`, todoData);

