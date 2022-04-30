import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FotoBrajhan from "../../static/fotoBrajhan.jpg";
import Footer from './footer'
import FotoDaniel from "../../static/fotoDaniel.png"
const Body = () => {
  return (
    <Container>
      <h2 className="display-2">Bienvenido a System Report</h2>
      <h4 className="display-6">
        Aqui podras administrar tu horario de clases de una mejor manera,
        agregando o quitando clases segun sea tu conveniencia
      </h4>
      <div className="row">
        <div className="d-flex col col-12 col-sm-12 col-md-6 col-lg-4 justify-content-center">
          <Card style={{ width: "18rem", marginBottom: "15px" }}>
            <Card.Img
              variant="top"
              src="https://avatars.githubusercontent.com/u/90437102?v=4"
            />
            <Card.Body>
              <Card.Title>Adxell Arango</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Desarrollador Full Stack
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Lider</Card.Subtitle>
              <Card.Text>Realizo el Back-end</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="d-flex col-12 col-sm-12 col-md-6 col-lg-4 justify-content-center">
          <Card style={{ width: "18rem", marginBottom: "15px" }}>
            <Card.Img
              variant="top"
              height="294px"
              with="294px"
              src={FotoBrajhan}
            />
            <Card.Body>
              <Card.Title>Brajhan Pedrozo</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Desarrollador Front-end
              </Card.Subtitle>
              <Card.Text>Relizo el Front-end</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="d-flex col-12 col-sm-12 col-md-12 col-lg-4 justify-content-center">
          <Card style={{ width: "18rem", marginBottom: "15px" }}>
            <Card.Img variant="top" src={FotoDaniel} />
            <Card.Body>
              <Card.Title>Daniel Julio</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Desarrollador Front-end
              </Card.Subtitle>
              <Card.Text>Realizo el Front-end</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row" style={{ marginTop: "40px" }}>
        <div className="col-lg-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.6914977952315!2d-74.78982448469674!3d10.986642358281243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d6495db4481%3A0xda626b57e9840495!2sInstituci%C3%B3n%20Universitaria%20ITSA!5e0!3m2!1ses!2sco!4v1647698530861!5m2!1ses!2sco"
            width="100%"
            height="450"
          ></iframe>
        </div>
        <div className="col-sm-12 col-lg-6">
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/49ov2nli6oo"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Body;
