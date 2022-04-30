import React from "react";
import { useState, useEffect } from "react";

import moment from "moment";

import Class from "../service/Class";
import User from "../service/User";
import ClassAdmin from "../service/ClassAdmin";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

const AddClass = (props) => {
  const [className, setClassName] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [professor, setProfessor] = useState("");
  const [user, setUser] = useState([]);
  const [data, setData] = useState(null);
  const [updateClassName, setUpdateClassName] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [show, setShow] = useState(false);
  const [idClass, setIdClass] = useState("");
  const [response, setResponse] = useState(null);
  const [showAlertDanger, setShowAlertDanger] = useState(false);
  const [showAlertSuccess, setShowAlertSucess] = useState(false);

  const saveClass = async () => {
    try {
      const dataClass = {
        name: className,
        time: time,
        description: description,
        professor: [professor],
      };
      const saveResponse = await Class.createClassAdmin(dataClass);
      setResponse(saveResponse);
      setClassName("");
      setTime("");
      setDescription("");
      setShowAlertSucess(true);
      changeStatusAlert();
    } catch (e) {
      console.log(e);
      setShowAlertDanger(true);
      changeStatusAlert();
    }
  };
  const changeStatusAlert = () => {
    setTimeout(() => {
      setShowAlertDanger(false);
      setShowAlertSucess(false);
    }, 3000);
  };
  const getDataClass = async () => {
    try {
      const responseDataClass = await ClassAdmin.getClassAdmin();
      setData(responseDataClass.data);
    } catch (e) {
      console.error(e);
    }
  };
  const onChangeClassName = (e) => {
    const className = e.target.value;
    setClassName(className);
  };
  const onChangeTime = (e) => {
    const time = e.target.value;
    setTime(time);
  };
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };
  const onChangeProfessor = (e) => {
    const valueProfessor = e.target.value;
    setProfessor(valueProfessor);
  };

  const onChangeUpdateClassName = (e) => {
    const valueUpdateClassName = e.target.value;
    setUpdateClassName(valueUpdateClassName);
  };
  const onChangeUpdateTime = (e) => {
    const valueUpdateTime = e.target.value;
    setUpdateTime(valueUpdateTime);
  };
  const onChangeUpdateDescription = (e) => {
    const valueUpdateDescription = e.target.value;
    setUpdateDescription(valueUpdateDescription);
  };

  const getProfessor = async () => {
    try {
      const dataProfessor = await User.getUsersAdmin();
      console.log(dataProfessor);
      setUser(dataProfessor.data.users);
    } catch (err) {
      console.error(err);
    }
  };
  const getClassById = async (id) => {
    try {
      const responseGetClassById = await ClassAdmin.getClassByIdAdmin(id);
      setUpdateClassName(responseGetClassById.data.name);
      setUpdateDescription(responseGetClassById.data.description);
      setUpdateTime(responseGetClassById.data.time);
      setIdClass(id);
      setShow(true);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getProfessor();
    getDataClass();
  }, []);

  useEffect(() => {
    getDataClass();
  }, [response]);
  const handleClose = () => {
    setShow(false);
  };
  const updateClass = async () => {
    try {
      const dataClassUpdate = {
        name: updateClassName,
        time: updateTime,
        description: updateDescription,
      };
      const responseUpdateClass = await ClassAdmin.updateClassByIdAdmin(
        idClass,
        dataClassUpdate
      );
      setResponse(responseUpdateClass);
      setShow(false);
    } catch (e) {
      console.error(e);
    }
  };
  const deleteClass = async (id) => {
    try {
      const responseDeleteClass = await ClassAdmin.deleteClassByIdAdmin(id);
      setResponse(responseDeleteClass);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      {showAlertSuccess ? <Alert variant="success">Clase Guardada</Alert> : ""}
      {showAlertDanger ? (
        <Alert variant="danger">Datos mal ingresado</Alert>
      ) : (
        ""
      )}
      <Form>
        <Form.Group>
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your class name"
            value={className}
            onChange={onChangeClassName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" value={time} onChange={onChangeTime} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="textarea"
            value={description}
            onChange={onChangeDescription}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Seleccionar Profesor</Form.Label>
          <Form.Select
            onChange={onChangeProfessor}
            aria-label="Default select example"
          >
            <option>Seleccionar profesor</option>
            {user.map((user, index) => {
              if (user.roles != "625c99421f0110b944789e5b") {
                return (
                  <option key={index} value={user._id}>
                    {user.username}
                  </option>
                );
              }
            })}
          </Form.Select>
        </Form.Group>
        <Button style={{ marginTop: "10px" }} onClick={saveClass}>
          Create class
        </Button>
      </Form>
      {data ? (
        <Table striped bordered hover style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Hora</th>
              <th>Description</th>
              <th>Creado</th>
              <th>Actualizado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{element.name}</td>
                  <td>{element.time}</td>
                  <td>{element.description}</td>
                  <td>
                    {moment(element.createdAt).format("DD MMMM YYYY HH:MM")}
                  </td>
                  <td>
                    {moment(element.updatedAt).format("DD MMMM YYYY HH:MM")}
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        getClassById(element._id);
                      }}
                      style={{ marginRight: "10px" }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteClass(element._id);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        ""
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Clase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Editar</Form.Label>
              <Form.Control
                type="text"
                value={updateClassName}
                onChange={onChangeUpdateClassName}
              />
              <Form.Control
                type="time"
                value={updateTime}
                onChange={onChangeUpdateTime}
              />
              <Form.Control
                type="text"
                value={updateDescription}
                onChange={onChangeUpdateDescription}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateClass}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default AddClass;
