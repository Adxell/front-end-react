import axios from "axios";

class UserService {
  singin(data) {
    return axios.post("http://localhost:3002/api/auth/signin", data);
  }
  getUsersAdmin() {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.get("http://localhost:3002/api/user", {
      headers: {
        x_access_token: token,
      },
    });
  }
  createUser1(data) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.post("http://localhost:3002/api/user", data, {
      headers: {
        x_access_token: token,
      },
    });
  }
  updateUser(data) {
    return axios.post("http://localhost:3002/api/user", data);
  }
}
export default new UserService();
