const getData = () => {
    const token = localStorage.getItem("data");
    if (token) {
      const data = JSON.parse(token);
      return data.token;
    }
};

export default getData;
