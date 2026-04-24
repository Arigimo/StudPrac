import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Адрес вашего Python-сервера

export const solveNetworkTask = async (nodesData) => {
  try {
    // Отправляем массив объектов, где у каждого есть id, x, y, C и K
    const response = await axios.post(`${API_URL}/solve`, {
      nodes: nodesData 
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка API:", error);
    throw error;
  }
};
