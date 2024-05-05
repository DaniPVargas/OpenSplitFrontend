import React from "react";
import { Container, Carousel, Row, Col, Image } from "react-bootstrap";

import { Header } from "./Header";

export const Login = () => {
  const images_src = ["/avion.svg", "/home.svg", "/friends.svg"];
  const texts = ["on your trips", "on your home", "with your friends"];
  const colors = ["primary", "secondary", "info"];
  return (
    <>
      <Header className="fixed-top py-2 py-lg-4" showTelegramButton={true} />
      <Container
        fluid
        className="p-0 pt-5 d-flex align-items-center min-vh-100 bg-light"
      >
        <Carousel
          controls={false}
          indicators={false}
          fade
          interval={4000}
          pause={false}
          variant="dark"
        >
          {images_src.map((src, index) => (
            <Carousel.Item key={index}>
              <CarouselImage
                src={src}
                text={texts[index]}
                color={colors[index]}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </>
  );
};

const CarouselImage = ({ src, text, color }) => {
  const images_src = ["/avion.svg", "/home.svg", "/friends.svg"];

  return (
    <Row lg={2} className="justify-content-center px-3 px-lg-0">
      <Col
        xs={10}
        sm={8}
        md={6}
        xl={5}
        xxl={4}
        className="bg-light px-lg-5 order-lg-2"
      >
        <Image fluid src={src} />
      </Col>
      <Col
        xl={5}
        xxl={4}
        className="bg-light d-flex flex-column justify-content-center px-md-4"
      >
        <h1 className="mb-0 text-center text-lg-start">
          Organize the expenses{" "}
        </h1>
        <h1
          className={`fw-bolder mb-0 text-center text-lg-start text-${color}`}
        >
          {text}
        </h1>
        <h1 className="text-center text-lg-start">without stress</h1>
        <Row className="my-2 justify-content-center justify-content-lg-start">
          {images_src.map((src, index) => (
            <Col key={index} xs="auto">
              <Image fluid src={src} style={{ width: "50px" }} />
            </Col>
          ))}
        </Row>
        <h5 className="text-mutted">
          Log in with Telegram and use our telegram bot or our webapp to
          organize your expenses
        </h5>
      </Col>
    </Row>
  );
};
