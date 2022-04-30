import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import getRoles from "./verify/getRoles";
import AddClass from "./components/add-class";
import ClassList from "./components/class-list";
import Login from "./components/login";
import ClassSimgle from "./components/class-simgle";
import Frond from "./components/frond/frond";
import Report from "./components/Report";
import AddProfessor from "./components/add-professor";
import Error from "./components/Error404";

const App = (props) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [profesor, setProfesor] = useState(null);
  const [userId, setUserId] = useState("");
  async function login(data) {
    setUser(data.token);
    setAdmin(getRoles().admin);
    setProfesor(getRoles().profesor);
  }
  const getData = async () => {
    try {
      const token = await localStorage.getItem("data");
      const data = JSON.parse(token);
      if (data) {
        setUser(data.token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getRoles = async () => {
    try {
      const roles = await localStorage.getItem("data");
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
        setAdmin(admin);
        setProfesor(profesor);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
    getRoles();
  }, []);

  const Logout = async () => {
    try {
      localStorage.removeItem("data");
      setUser(null);
      setAdmin(null);
      setProfesor(null);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand style={{ marginLeft: "10px" }}>
          System Report
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Button>
                <Link
                  style={{ textDecoration: "none", color: "#fff" }}
                  to={"/"}
                >
                  Home
                </Link>
              </Button>
            </Nav.Link>
            {profesor ? (
              <Nav.Link>
                <Button>
                  <Link
                    style={{ textDecoration: "none", color: "#fff" }}
                    to={"/class"}
                  >
                    Clases
                  </Link>
                </Button>
              </Nav.Link>
            ) : (
              ""
            )}
            {admin ? (
              <Nav.Link>
                <Button style={{ marginRight: "15px" }}>
                  <Link
                    style={{ textDecoration: "none", color: "#fff" }}
                    to={"/addclass"}
                  >
                    Agregar Clases
                  </Link>
                </Button>
                <Button>
                  <Link
                    style={{ textDecoration: "none", color: "#fff" }}
                    to={"/addprofessor"}
                  >
                    Agregar profesor
                  </Link>
                </Button>
              </Nav.Link>
            ) : (
              ""
            )}

            {user ? (
              <Nav.Link>
                <Button variant="danger" onClick={Logout}>
                  Cerrar sesión
                </Button>
              </Nav.Link>
            ) : (
              <Nav.Link>
                <Button>
                  <Link
                    style={{ textDecoration: "none", color: "#fff" }}
                    to={"/login"}
                  >
                    Iniciar sesión
                  </Link>
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path={["/"]} component={Frond}></Route>
        <Route
          path="/addclass/"
          render={(props) => <AddClass {...props} />}
        ></Route>
        <Route
          path="/addprofessor/"
          render={(props) => <AddProfessor {...props} />}
        ></Route>
        <Route
          path="/class"
          render={(props) => <ClassList {...props} />}
        ></Route>
        <Route
          path="/ditails/:id/"
          render={(props) => <ClassSimgle {...props} />}
        ></Route>
        <Route
          path="/addditails/:id/report"
          render={(props) => <Report {...props} />}
        ></Route>
        <Route
          path="/login"
          render={(props) => <Login {...props} login={login} />}
        ></Route>
        <Route path="*" component={Error}></Route>
      </Switch>
    </div>
  );
};

export default App;
