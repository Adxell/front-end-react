import axios from "axios";

class ServiceAdminClass {
  getClassAdmin() {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.get("http://localhost:3002/api/classadmin", {
      headers: {
        x_access_token: token,
      },
    });
  }
  getClassByIdAdmin(id) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.get(`http://localhost:3002/api/classadmin/${id}`, {
      headers: {
        x_access_token: token,
      },
    });
  }
  updateClassByIdAdmin(id, dataClass) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.put(
      `http://localhost:3002/api/classadmin/${id}`,
      {
        name: dataClass.name,
        time: dataClass.time,
        description: dataClass.description,
      },
      {
        headers: {
          x_access_token: token,
        },
      }
    );
  }
  deleteClassByIdAdmin(id) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.delete(`http://localhost:3002/api/classadmin/${id}`, {
      headers: {
        x_access_token: token,
      },
    });
  }
}

export default new ServiceAdminClass();
