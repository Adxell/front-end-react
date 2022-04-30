import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import UserService from "../service/User";
import ReportService from "../service/Report";

const Report = (props) => {
  const [report, setReport] = useState("");
  const [validated, setValidated] = useState(false);

  const onChangeReport = (e) => {
    const report = e.target.value;
    setReport(report);
  };


  const addReport = async () => {
    try {
      const data = { id: props.match.params.id, report: report };
      const ResponseReport = await ReportService.addReport(data);
      props.history.push(`/ditails/${props.match.params.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container>
        <h1>Reportes</h1>
        <Form noValidate validated={validated}>
          <Form.Group required>
            <Form.Control
              type="text"
              placeholder="Enter report"
              value={report}
              onChange={onChangeReport}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" onClick={addReport}>
            Enviar
          </Button>
        </Form>
      </Container>
    </div>
  );
};
export default Report;
