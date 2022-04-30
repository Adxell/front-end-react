import axios from "axios";


class ReportService {
  addReport(data) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.post(
      `http://localhost:3002/api/report/${data.id}`,
      {
        description: data.report,
      },
      {
        headers: {
          x_access_token: token,
        },
      }
    );
  }

  getReports(id) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.get(`http://localhost:3002/api/report/${id}`, {
      headers: {
        x_access_token: token,
      },
    });
  }

  getReportById(idReport) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.get(`http://localhost:3002/api/reportedit/${idReport}`, {
      headers: {
        x_access_token: token,
      },
    });
  }

  updateReportById(data) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.put(
      `http://localhost:3002/api/reportedit/${data.data.id}`,
      {
        description: data.data.update,
      },
      {
        headers: {
          x_access_token: token,
        },
      }
    );
  }

  deleteReportById(idReport) {
    const dataLocalStorage = localStorage.getItem("data");
    const dataLocalStorageParse = JSON.parse(dataLocalStorage);
    const token = dataLocalStorageParse.token;
    return axios.delete(`http://localhost:3002/api/reportdelete/${idReport}`, {
      headers: {
        x_access_token: token,
      },
    });
  }
}

export default new ReportService();
