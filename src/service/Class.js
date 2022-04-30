import axios from "axios";

class ClassService {
  createClassAdmin(data) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.post("http://localhost:3002/api/class", data, {
      headers: {
        x_access_token: token,
      },
    });
  }

  getClassForProfessor1(idProfesor) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.get(`http://localhost:3002/api/class/${idProfesor}`, {
      headers: {
        x_access_token: token,
      },
    });
  }
  getClassById(id) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.get(`http://localhost:3002/api/class/ditails/${id}`, {
      headers: {
        x_access_token: token,
      },
    });
  }
  deleteClassById(id) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.put(`http://localhost:3002/api/class`, {
      headers: {
        x_access_token: token,
      },
    });
  }
}

export default new ClassService();
