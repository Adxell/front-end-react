import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ServiceClass from "../service/Class";
import ServiceReport from "../service/Report";

import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ClassSimgle = (props) => {
  const [data, setData] = useState([]);
  const [report, setReports] = useState([]);
  const [show, setShow] = useState(false);
  const [updateReports, setUpdateReports] = useState("");
  const [responseDelete, setResponseDelete] = useState(null);
  const [idReport, setIdReport] = useState("");
  const [ifUpdate, setIfUpdate] = useState(null);

  const getData = async () => {
    try {
      const data = await ServiceClass.getClassById(props.match.params.id);
      setData(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getReports = async () => {
    try {
      const dataReport = await ServiceReport.getReports(props.match.params.id);
      setReports(dataReport.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateReport = (e) => {
    const updateRepor = e.target.value;
    setUpdateReports(updateRepor);
  };

  const handleShow = async (id) => {
    try {
      const dataRepor = await ServiceReport.getReportById(id);
      setUpdateReports(dataRepor.data.description);
      setIdReport(dataRepor.data._id);
      setShow(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setShow(false);
  };
  const deleteReport = async (id) => {
    try {
      const deleteReport = await ServiceReport.deleteReportById(id);
      setResponseDelete(deleteReport);
    } catch (e) {
      console.log(e);
    }
  };
  const saveUpdateReport = async (id, update) => {
    try {
      const data = {
        id: id,
        update: update,
      };
      const updateReports = await ServiceReport.updateReportById({ data });
      setIfUpdate(updateReports);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getReports();
  }, [responseDelete]);
  useEffect(() => {
    getReports();
  }, [ifUpdate]);
  useEffect(() => {
    getData();
    getReports();
  }, [props.match.params.id]);

  return (
    <div>
      <h2>Nombre</h2>
      <h2>{data.name}</h2>
      <h2>Descripcion</h2>
      <h2>{data.description}</h2>
      <Button>
        <Link
          style={{ textDecoration: "none", color: "#fff" }}
          to={`/addditails/${data._id}/report`}
        >
          Agregar Reporte
        </Link>
      </Button>
      <h2>Reportes</h2>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Reporte</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {report.map((d, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{d.description}</td>
                  <td>
                    <Button
                      onClick={() => {
                        handleShow(d._id);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => {
                        deleteReport(d._id);
                      }}
                      variant="danger"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Reporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Reporte</Form.Label>
              <Form.Control
                type="text"
                value={updateReports}
                onChange={updateReport}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              saveUpdateReport(idReport, updateReports);
              setShow(false);
            }}
          >
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ClassSimgle;
