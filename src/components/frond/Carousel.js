import React from "react";
import Carousel from "react-bootstrap/Carousel";

const CarouselCustom = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://d500.epimg.net/cincodias/imagenes/2020/01/21/fortunas/1579632922_570853_1579633328_noticia_normal.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.comminit.com/la/files/imagecache/rotator_980x400/espere.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://opinarg.com/datos/fotos/2021/01/15/10567-10/imagen_13172.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default CarouselCustom;
