import React, { useState } from "react";
import From from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import UserService from "../service/User";
import Alert from "react-bootstrap/Alert";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertd, setAlertd] = useState(false);
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const login = async () => {
    try {
      let data = {
        email: email,
        password: password,
      };
      const response = await UserService.singin(data);
      const dataToLocalStore = {
        token: response.data.token,
        roles: response.data.rolesA,
        userId: response.data.userId,
      };
      saveData(dataToLocalStore);
    } catch (error) {
      showAlert();
    }
  };
  const showAlert = () => {
    setAlertd(true);
    closeAlert();
  };

  const saveData = async (data) => {
    try {
      localStorage.setItem("data", JSON.stringify(data));
      if (!alertd) {
        props.login(data);
        props.history.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const closeAlert = () => {
    setTimeout(() => {
      setAlertd(false);
    }, 3000);
  };

  return (
    <div>
      <Container style={{ width: "75%" }}>
        {alertd ? <Alert variant="danger">Datos no encontrados</Alert> : ""}
        <h1>Login</h1>
        <From>
          <From.Group>
            <From.Label>Correo</From.Label>
            <From.Control
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={onChangeEmail}
            />
          </From.Group>
          <From.Group>
            <From.Label>Password</From.Label>
            <From.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={onChangePassword}
            />
          </From.Group>
          <Button
            variant="primary"
            style={{ marginTop: "20px" }}
            onClick={login}
          >
            Iniciar seccion
          </Button>
        </From>
      </Container>
    </div>
  );
};
export default Login;
