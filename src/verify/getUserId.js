const getUserId =  () => {
   const token = localStorage.getItem("data");
    if (token) {
      const data = JSON.parse(token);
      return data.userId;
    }
};

export default getUserId;
