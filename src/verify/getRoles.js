const getRoles =  () => {

    const roles = localStorage.getItem("data");
    if (roles) {
      const dataRoles = JSON.parse(roles).roles;
      let admin, profesor;
      dataRoles.map((data) => {
        if (data === "admin") {
          admin = data;
        } else if (data === "profesor") {
          profesor = data;
        }
      });
      return { admin, profesor };
    }
};
export default getRoles;
