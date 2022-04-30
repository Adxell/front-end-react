import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Contianer from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ServiceClass from "../service/Class.js";
import { Link } from "react-router-dom";
import getUserId from "../verify/getUserId";


function ClassList(props, response) {
const [data, setData] = useState([]);

const dataLocalStorage = localStorage.getItem("data")
const dataLocalStorageParse = JSON.parse(dataLocalStorage);

const token = dataLocalStorageParse.token;

const getData = async () => {
  const idProfesor = getUserId();
  const data = await ServiceClass.getClassForProfessor1(idProfesor, token);
  setData(data.data);
};
console.log(props)
console.log(response);
useEffect(() => {
  getData();
}, [props.match.isExact]);

return (
  <div>
    <Contianer>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Hora</th>
            <th>Description</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{d.name}</td>
                <td>{d.time}</td>
                <td>{d.description}</td>
                <td>
                  <Button>
                    <Link
                      style={{ textDecoration: "none", color: "#fff" }}
                      to={`/ditails/${d._id}`}
                    >
                      Ver detalles
                    </Link>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Contianer>
  </div>
);
}
export default ClassList;
