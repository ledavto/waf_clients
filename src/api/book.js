import axios from 'axios';
import Notiflix from 'notiflix';

class Api {
  // BASE_URL = 'http://localhost:3000';
  BASE_URL = 'https://waf-clients-backend.onrender.com';

  handleError(error) {
    Notiflix.Notify.failure(error.response.data.message);
  }

  async fetchBooks(userId) {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/book/${userId}`);
      // console.log('List books - ', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getBooks() {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/book`);
      console.log(response.data);
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

  async deleteBook(bookId) {
    try {
      const response = await axios.delete(
        `${this.BASE_URL}/api/book/${bookId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateBook(bookId, updDate) {
    try {
      const response = await axios.patch(
        `${this.BASE_URL}/api/book/${bookId}`,
        updDate
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

const apiBook = new Api();
export default apiBook;
