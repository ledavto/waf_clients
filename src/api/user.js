import axios from 'axios';
import Notiflix from 'notiflix';

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

  async getUsers(params) {
    try {
      const response = await axios.get(`${this.BASE_URL}/api/user`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async addUser(userData) {
    try {
      const response = await axios.post(`${this.BASE_URL}/api/user`, userData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteUser(userId) {
    try {
      const response = await axios.delete(
        `${this.BASE_URL}/api/user/${userId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  async updateUser(userId, user) {
    try {
      const response = await axios.patch(
        `${this.BASE_URL}/api/user/${userId}`,
        user
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

const apiUser = new Api();
export default apiUser;
