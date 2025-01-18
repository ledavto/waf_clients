import axios from 'axios';
import Notiflix from 'notiflix';
// Реалізація всіх запитів через екземпляр классу
// nodemon ./src/js/api.js

class Api {
  BASE_URL = 'http://localhost:3000';

  handleError(error) {
    Notiflix.Notify.failure(error.response.data.message);
  }

  async fetchBusinessUsers() {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/user/bussines`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createBook(userData) {
    try {
      const response = await axios.post(`${this.BASE_URL}/api/book`, userData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

const apiBook = new Api();
export default apiBook;
