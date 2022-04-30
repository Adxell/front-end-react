import React from "react";
import { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"

import User from "../service/User"

const AddProfessor = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [document, setDocument] = useState("");
  const [role, setRole] = useState("");
  const [showAlertDanger, setShowAlertDanger]=useState(false)
  const [showAlertSuccess, setShowAlertSuccess]=useState(false)

  const onChangeUserName = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeDocument = (e) => {
    const document = e.target.value;
    setDocument(document);
  };
  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  };
  const saveProfessor = async () => {
    try {
      const dataProfessor = {
        username: username,
        email: email,
        password: password,
        document: document,
        roles:[role]
      };
      const saveResponse = await User.createUser1(dataProfessor);
      setShowAlertSuccess(true);
      changeAlterStatus();
    } catch (e) {
      console.log(e);
      setShowAlertDanger(true)
      changeAlterStatus();
    }
  };

  const changeAlterStatus=()=>{
    setTimeout(() => {
      setShowAlertSuccess(false)
      setShowAlertDanger(false)
    }, 3000);
  }

  return (
    <Container>
      {showAlertSuccess ? (
        <Alert variant="success">Profesor registrado</Alert>
      ) : (
        ""
      )}
      {showAlertDanger ? (
        <Alert variant="danger">Profesor con datos mal ingresado</Alert>
      ) : (
        ""
      )}
      <Form>
        <Form.Group>
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar nombre de usuario"
            value={username}
            onChange={onChangeUserName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="**********"
            value={password}
            onChange={onChangePassword}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Documento</Form.Label>
          <Form.Control
            type="text"
            placeholder="123456789"
            value={document}
            onChange={onChangeDocument}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Roles</Form.Label>
          <Form.Select
            onChange={onChangeRole}
            aria-label="Default select example"
          >
            <option>Seleccionar rol</option>
            <option value="625c99421f0110b944789e5a">profesor</option>
          </Form.Select>
        </Form.Group>
        <Button style={{marginTop:"15px"}} onClick={saveProfessor}>Create profesor</Button>
      </Form>
    </Container>
  );
};
export default AddProfessor;
